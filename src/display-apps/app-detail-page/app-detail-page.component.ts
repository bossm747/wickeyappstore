import 'rxjs/add/operator/switchMap';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, HostBinding, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
// import { trigger, style, animate, transition } from '@angular/animations';
import { WasAppService } from '../../was-app.service';
import { ClipboardService } from '../../clipboard.service';
import { slideInDownAnimation } from '../../animations';
import { GetCategoryPipe } from '../../pipes/get-category.pipe';
import { WASAlertComponent } from '../../ui/popover/popover-alert/popover-alert.component';
import { PopoverUpComponent } from '../../ui/popover/popover-up/popover-up.component';

@Component({
  selector: 'app-detail-page',
  templateUrl: './app-detail-page.component.html',
  styleUrls: ['./app-detail-page.component.css'],
  animations: [slideInDownAnimation]
})
export class AppDetailPageComponent implements OnInit {
  @ViewChild(WASAlertComponent) wasalert: WASAlertComponent;
  @ViewChild(PopoverUpComponent) wasup: PopoverUpComponent;
  // ANIMATION TO USE, Set the routeAnimation property to true since we only care about the :enter and :leave states
  // https://angular.io/guide/router#adding-animations-to-the-routed-component
  @HostBinding('@routeAnimation') routeAnimation = true;
  // STYLE OF OUTER DIV/PAGE
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'fixed';
  @HostBinding('style.z-index') zIndex = 2147483638;
  @HostBinding('style.top') top = 0;
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';
  public busy: Subscription;
  public selected_app: any;
  public hasscreenshots;
  public selected_app_test = 'hello';
  public showReviews;
  private dom: Document;

public config: Object = {
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    paginationClickable: true,
    freeMode: false
  };

  constructor(
    @Inject( DOCUMENT ) dom: Document,
    private route: ActivatedRoute,
    private router: Router,
    private wasAppService: WasAppService,
    private clipboardService: ClipboardService,
  ) {
    this.dom = dom;
  }

  ngOnInit() {
    // TODO: Load more reviews on reviews open
    this.busy = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.wasAppService.appFromSlug(params.get('slug'))
      ).subscribe((_selected_app: any) => {
        console.log('AppDetailPageComponent', _selected_app);
        if (_selected_app[0] !== undefined) {
          _selected_app = _selected_app[0];
        }
        this.selected_app = _selected_app;
        if (this.busy) {
          this.busy.unsubscribe();
        } else {
          setTimeout(() => {
            if (this.busy) {
              this.busy.unsubscribe();
            }
          }, 40);
        }
        if (this.selected_app.screenshot_1) {
          this.hasscreenshots = true;
        }
      }, (error) => {
        console.log('AppDetailPageComponent: ERROR:', error);
        this.wasalert.open(
          { title: 'Attention', text: error }
        );
      });
  }

  private handleError(error: any): Promise<any> {
    // .catch(this.handleError);
    console.error('An error occurred', error);  // for demo purposes
    return Promise.reject(error.message || error);
  }

  performCopyLink() {
    let wasSuccessful = false;
    const shareLink = this.dom.querySelector('.was-share-link');
    const userAgent = navigator.userAgent || navigator.vendor || (<any>window).opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !(<any>window).MSStream) {
      const range = this.dom.createRange();
      range.selectNode(shareLink);
      window.getSelection().addRange(range);
      console.log(shareLink);
      (<any>shareLink).setSelectionRange(0, 999999);
      wasSuccessful = this.dom.execCommand('copy');
      console.log('iOS Copy email command was ', (wasSuccessful ? 'successful' : 'unsuccessful'));
      window.getSelection().removeAllRanges();
    } else {
      (<any>shareLink).select();
      wasSuccessful = this.dom.execCommand('copy');
      console.log('Copy was ', (wasSuccessful ? 'successful' : 'unsuccessful'));
    }
    if (wasSuccessful === false) {
      throw({name: 'CopyError', message: 'unsuccessful copy'});
    }
    (<any>shareLink).blur();
    // scroll back to top
    window.scrollTo(0, 0);
    this.wasup.open('Link Copied', 'Copied link to clipboard!', 'fa fa-share fa-3x');
  }

  onShareBtn() {
    try {
      this.performCopyLink();
    } catch (shareError) {
      console.error('onShareBtn', shareError);
      this.wasalert.open(
        { title: 'Copy Error', text: `Share link is: https://wickeyappstore.com/app/${this.selected_app.slug}` }
      );
    }
    // const _app_url = `https://wickeyappstore.com/app/${this.selected_app.slug}`;
    // this.clipboardService.copy(_app_url).then((val: string) => {
    //   this.wasup.open('Link Copied', 'Copied link to clipboard!', 'fa fa-share fa-3x');
    //   console.log('Copied link to clipboard', _app_url);
    // }).catch((err: any) => {
    //   console.error('onShareBtn', err);
    // });
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  handleReviews(state: string) {
    console.log ('handle review state' , state);
    if (state === 'open') {
      this.showReviews = 1;
    } else {
      this.showReviews = null;
    }
  }
  getReviewTitle() {
    return this.selected_app.name;
  }

}
