// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback-datasource-juggler
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Callback, Options, PromiseOrVoid} from './common';
import {ModelBase, ModelData} from './model';
import {Filter} from './query';

/**
 * Data object for KV models
 */
export type KVData = ModelData<KeyValueModel>;

/**
 * Key/Value model
 */
export declare class KeyValueModel extends ModelBase {
  /**
   * Return the value associated with a given key.
   *
   * @param {String} key Key to use when searching the database.
   * @options {Object} options
   * @callback {Function} callback
   * @param {Error} err Error object.
   * @param {Any} result Value associated with the given key.
   * @promise
   *
   * @header KeyValueModel.get(key, cb)
   */
  get(
    key: string,
    options?: Options,
    callback?: Callback<KVData>,
  ): PromiseOrVoid<KVData>;

  /**
   * Persist a value and associate it with the given key.
   *
   * @param {String} key Key to associate with the given value.
   * @param {Any} value Value to persist.
   * @options {Number|Object} options Optional settings for the key-value
   *   pair. If a Number is provided, it is set as the TTL (time to live) in ms
   *   (milliseconds) for the key-value pair.
   * @property {Number} ttl TTL for the key-value pair in ms.
   * @callback {Function} callback
   * @param {Error} err Error object.
   * @promise
   *
   * @header KeyValueModel.set(key, value, cb)
   */
  set(
    key: string,
    value: KVData,
    options?: Options,
    callback?: Callback<boolean>,
  ): PromiseOrVoid<boolean>;

  /**
   * Set the TTL (time to live) in ms (milliseconds) for a given key. TTL is the
   * remaining time before a key-value pair is discarded from the database.
   *
   * @param {String} key Key to use when searching the database.
   * @param {Number} ttl TTL in ms to set for the key.
   * @options {Object} options
   * @callback {Function} callback
   * @param {Error} err Error object.
   * @promise
   *
   * @header KeyValueModel.expire(key, ttl, cb)
   */
  expire(
    key: string,
    ttl: number,
    options?: Options,
    callback?: Callback<number>,
  ): PromiseOrVoid<number>;

  /**
   * Return the TTL (time to live) for a given key. TTL is the remaining time
   * before a key-value pair is discarded from the database.
   *
   * @param {String} key Key to use when searching the database.
   * @options {Object} options
   * @callback {Function} callback
   * @param {Error} error
   * @param {Number} ttl Expiration time for the key-value pair. `undefined` if
   *   TTL was not initially set.
   * @promise
   *
   * @header KeyValueModel.ttl(key, cb)
   */
  ttl(
    key: string,
    options?: Options,
    callback?: Callback<number>,
  ): PromiseOrVoid<number>;

  /**
   * Return all keys in the database.
   *
   * **WARNING**: This method is not suitable for large data sets as all
   * key-values pairs are loaded into memory at once. For large data sets,
   * use `iterateKeys()` instead.
   *
   * @param {Object} filter An optional filter object with the following
   * @param {String} filter.match Glob string used to filter returned
   *   keys (i.e. `userid.*`). All connectors are required to support `*` and
   *   `?`, but may also support additional special characters specific to the
   *   database.
   * @param {Object} options
   * @callback {Function} callback
   * @promise
   *
   * @header KeyValueModel.keys(filter, cb)
   */
  keys(
    filter?: Filter,
    options?: Options,
    callback?: Callback<string[]>,
  ): PromiseOrVoid<string[]>;

  /**
   * Asynchronously iterate all keys in the database. Similar to `.keys()` but
   * instead allows for iteration over large data sets without having to load
   * everything into memory at once.
   *
   * Callback example:
   * ```js
   * // Given a model named `Color` with two keys `red` and `blue`
   * var iterator = Color.iterateKeys();
   * it.next(function(err, key) {
   *   // key contains `red`
   *   it.next(function(err, key) {
   *     // key contains `blue`
   *   });
   * });
   * ```
   *
   * Promise example:
   * ```js
   * // Given a model named `Color` with two keys `red` and `blue`
   * var iterator = Color.iterateKeys();
   * Promise.resolve().then(function() {
   *   return it.next();
   * })
   * .then(function(key) {
   *   // key contains `red`
   *   return it.next();
   * });
   * .then(function(key) {
   *   // key contains `blue`
   * });
   * ```
   *
   * @param {Object} filter An optional filter object with the following
   * @param {String} filter.match Glob string to use to filter returned
   *   keys (i.e. `userid.*`). All connectors are required to support `*` and
   *   `?`. They may also support additional special characters that are
   *   specific to the backing database.
   * @param {Object} options
   * @returns {AsyncIterator} An Object implementing `next(cb) -> Promise`
   *   function that can be used to iterate all keys.
   *
   * @header KeyValueModel.iterateKeys(filter)
   */
  iterateKeys(filter?: Filter, options?: Options): Iterator<Promise<string>>;
}
