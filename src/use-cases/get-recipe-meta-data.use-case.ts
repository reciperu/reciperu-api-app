import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { JSDOM } from 'jsdom';

const FAVICON_URL = 'http://www.google.com/s2/favicons?domain=';
@Injectable()
export class GetRecipeMetaDateUseCase {
  async execute(recipeUrl: string) {
    const dom = await this.parseUrlToDom(recipeUrl);
    const ogImage = this.getOgpData(dom, 'og:image');
    let ogTitle = this.getOgpData(dom, 'og:title');
    const siteName = this.getSiteName(dom, recipeUrl);
    const faviconUrl = FAVICON_URL + recipeUrl;
    if (ogTitle.includes('\n')) {
      ogTitle = ogTitle.split('\n')[0];
    }
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
    // instagramの場合
    if (recipeUrl.includes('instagram.com')) {
      return 'Instagram';
    }
    // note: 今後他のサイトも追加していく
    return '';
  }

  async parseUrlToDom(recipeUrl: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(recipeUrl);
    const content = await page.content();
    await browser.close();
    return new JSDOM(content);
  }
}
