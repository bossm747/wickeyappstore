'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">wickeyappstore</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/WickeyAppStoreModule.html" data-type="entity-link">WickeyAppStoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WickeyAppStoreModule-c983662ae4a65926ba02259903955614"' : 'data-target="#xs-components-links-module-WickeyAppStoreModule-c983662ae4a65926ba02259903955614"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WickeyAppStoreModule-c983662ae4a65926ba02259903955614"' :
                                            'id="xs-components-links-module-WickeyAppStoreModule-c983662ae4a65926ba02259903955614"' }>
                                            <li class="link">
                                                <a href="components/WasAlert.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WasAlert</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WasLeaderboard.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WasLeaderboard</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WasPay.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WasPay</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WasProfile.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WasProfile</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WasReview.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WasReview</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WasSSO.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WasSSO</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WasShop.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WasShop</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WasUp.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WasUp</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WickeyAppStoreComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WickeyAppStoreComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WasDataService.html" data-type="entity-link">WasDataService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Inapp.html" data-type="entity-link">Inapp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});