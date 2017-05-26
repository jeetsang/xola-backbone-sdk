import Backbone from "backbone";
import PageableCollection from 'backbone.paginator';
import { UrlHelper } from '../helpers/url_helper';
import { Experience } from './experience';
import { GiftOffer } from './gift_offer';

export const Product = Backbone.Model.extend({
  defaults() {
    return {
      object: null
    };
  }
});

export const ProductCollection = PageableCollection.extend({
  model(model, options) {
    switch (model.object) {
      case 'experience':
        return new Experience(model, options);
      case 'gift_offer':
        return new GiftOffer(model, options);
      default:
        return false;
    }
  },

  url: UrlHelper.xola('/api/products'),

  state: {
    pageSize: 100,
    firstPage: 0,
  },

  queryParams: {
    currentPage: 'skip',
    pageSize: 'limit',
  },

  parseRecords(resp) {
    return resp.data;
  },

  parseLinks(resp) {
    return resp.paging;
  },

  /**
   * Sort comparator that sorts by experience name.
   *
   * @param {Experience} model
   */
  comparator(model) {
    return model.get('name');
  },
});