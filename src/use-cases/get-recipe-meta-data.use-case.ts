import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
const FAVICON_URL = 'http://www.google.com/s2/favicons?domain=';
@Injectable()
export class GetRecipeMetaDateUseCase {
  async execute(recipeUrl: string) {
    const dom = await this.parseUrlToDom(recipeUrl);
    const ogImage = this.getOgpData(dom, 'og:image');
    const ogTitle = this.getOgpData(dom, 'og:title');
    const siteName = this.getSiteName(dom, recipeUrl);
    const faviconUrl = FAVICON_URL + recipeUrl;
    return {
      title: ogTitle,
      thumbnailUrl: ogImage,
      appName: siteName,
      faviconUrl: faviconUrl,
    };
  }

  getOgpData(dom: JSDOM, property: string) {
    return dom.window.document
      .querySelector(`meta[property='${property}']`)
      ?.getAttribute('content');
  }

  getSiteName(dom: JSDOM, recipeUrl: string) {
    const siteName = this.getOgpData(dom, 'og:site_name');
    if (siteName) {
      return siteName;
    }
    // サイト名がなければドメインから判断してサイト名を取得する
    // cookpadの場合
    if (recipeUrl.includes('cookpad.com')) {
      return 'クックパッド';
    }
    // note: 今後他のサイトも追加していく
    return '';
  }

  async parseUrlToDom(recipeUrl: string) {
    const response = await fetch(recipeUrl);
    const data = await response.text();
    return new JSDOM(data);
  }
}
