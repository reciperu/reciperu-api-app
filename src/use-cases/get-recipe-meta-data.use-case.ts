import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
const FAVICON_URL = 'http://www.google.com/s2/favicons?domain=';
@Injectable()
export class GetRecipeMetaDateUseCase {
  async execute(recipeUrl: string) {
    const dom = await this.parseUrlToDom(recipeUrl);
    const ogImage = this.getOgpData(dom, 'og:image');
    const ogTitle = this.getOgpData(dom, 'og:title');
    const siteName = this.getOgpData(dom, 'og:site_name');
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

  async parseUrlToDom(recipeUrl: string) {
    const response = await fetch(recipeUrl);
    const data = await response.text();
    return new JSDOM(data);
  }
}
