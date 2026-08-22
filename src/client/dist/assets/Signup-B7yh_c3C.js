import{r as x,u as He,a as Ve,j as o,z as ze,y as le}from"./index-zgV1dOG2.js";const We=()=>{};var de={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke=function(t){const e=[];let r=0;for(let n=0;n<t.length;n++){let s=t.charCodeAt(n);s<128?e[r++]=s:s<2048?(e[r++]=s>>6|192,e[r++]=s&63|128):(s&64512)===55296&&n+1<t.length&&(t.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++n)&1023),e[r++]=s>>18|240,e[r++]=s>>12&63|128,e[r++]=s>>6&63|128,e[r++]=s&63|128):(e[r++]=s>>12|224,e[r++]=s>>6&63|128,e[r++]=s&63|128)}return e},Ge=function(t){const e=[];let r=0,n=0;for(;r<t.length;){const s=t[r++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const a=t[r++];e[n++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){const a=t[r++],i=t[r++],l=t[r++],c=((s&7)<<18|(a&63)<<12|(i&63)<<6|l&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const a=t[r++],i=t[r++];e[n++]=String.fromCharCode((s&15)<<12|(a&63)<<6|i&63)}}return e.join("")},De={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<t.length;s+=3){const a=t[s],i=s+1<t.length,l=i?t[s+1]:0,c=s+2<t.length,d=c?t[s+2]:0,h=a>>2,p=(a&3)<<4|l>>4;let f=(l&15)<<2|d>>6,b=d&63;c||(b=64,i||(f=64)),n.push(r[h],r[p],r[f],r[b])}return n.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ke(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Ge(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const r=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<t.length;){const a=r[t.charAt(s++)],l=s<t.length?r[t.charAt(s)]:0;++s;const d=s<t.length?r[t.charAt(s)]:64;++s;const p=s<t.length?r[t.charAt(s)]:64;if(++s,a==null||l==null||d==null||p==null)throw new Ke;const f=a<<2|l>>4;if(n.push(f),d!==64){const b=l<<4&240|d>>2;if(n.push(b),p!==64){const k=d<<6&192|p;n.push(k)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Ke extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qe=function(t){const e=ke(t);return De.encodeByteArray(e,!0)},z=function(t){return qe(t).replace(/\./g,"")},Je=function(t){try{return De.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe=()=>Ye().__FIREBASE_DEFAULTS__,Ze=()=>{if(typeof process>"u"||typeof de>"u")return;const t=de.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Qe=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Je(t[1]);return e&&JSON.parse(e)},Ne=()=>{try{return We()||Xe()||Ze()||Qe()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},et=t=>{var e,r;return(r=(e=Ne())===null||e===void 0?void 0:e.emulatorHosts)===null||r===void 0?void 0:r[t]},tt=t=>{const e=et(t);if(!e)return;const r=e.lastIndexOf(":");if(r<=0||r+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(r+1),10);return e[0]==="["?[e.substring(1,r-1),n]:[e.substring(0,r),n]},Ae=()=>{var t;return(t=Ne())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,r)=>{this.resolve=e,this.reject=r})}wrapCallback(e){return(r,n)=>{r?this.reject(r):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(r):e(r,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const r={alg:"none",type:"JWT"},n=e||"demo-project",s=t.iat||0,a=t.sub||t.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},t);return[z(JSON.stringify(r)),z(JSON.stringify(i)),""].join(".")}function st(){try{return typeof indexedDB=="object"}catch{return!1}}function at(){return new Promise((t,e)=>{try{let r=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),r||self.indexedDB.deleteDatabase(n),t(!0)},s.onupgradeneeded=()=>{r=!1},s.onerror=()=>{var a;e(((a=s.error)===null||a===void 0?void 0:a.message)||"")}}catch(r){e(r)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it="FirebaseError";class B extends Error{constructor(e,r,n){super(r),this.code=e,this.customData=n,this.name=it,Object.setPrototypeOf(this,B.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ce.prototype.create)}}class Ce{constructor(e,r,n){this.service=e,this.serviceName=r,this.errors=n}create(e,...r){const n=r[0]||{},s=`${this.service}/${e}`,a=this.errors[e],i=a?ot(a,n):"Error",l=`${this.serviceName}: ${i} (${s}).`;return new B(s,l,n)}}function ot(t,e){return t.replace(ct,(r,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const ct=/\{\$([^}]+)}/g;function te(t,e){if(t===e)return!0;const r=Object.keys(t),n=Object.keys(e);for(const s of r){if(!n.includes(s))return!1;const a=t[s],i=e[s];if(ue(a)&&ue(i)){if(!te(a,i))return!1}else if(a!==i)return!1}for(const s of n)if(!r.includes(s))return!1;return!0}function ue(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lt(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(t){return t.endsWith(".cloudworkstations.dev")}async function ut(t){return(await fetch(t,{credentials:"include"})).ok}class L{constructor(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,r){this.name=e,this.container=r,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const r=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(r)){const n=new rt;if(this.instancesDeferred.set(r,n),this.isInitialized(r)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:r});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(r).promise}getImmediate(e){var r;const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(r=e==null?void 0:e.optional)!==null&&r!==void 0?r:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(pt(e))try{this.getOrInitializeService({instanceIdentifier:T})}catch{}for(const[r,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(r);try{const a=this.getOrInitializeService({instanceIdentifier:s});n.resolve(a)}catch{}}}}clearInstance(e=T){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(r=>"INTERNAL"in r).map(r=>r.INTERNAL.delete()),...e.filter(r=>"_delete"in r).map(r=>r._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=T){return this.instances.has(e)}getOptions(e=T){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:r={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:r});for(const[a,i]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(a);n===l&&i.resolve(s)}return s}onInit(e,r){var n;const s=this.normalizeInstanceIdentifier(r),a=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;a.add(e),this.onInitCallbacks.set(s,a);const i=this.instances.get(s);return i&&e(i,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,r){const n=this.onInitCallbacks.get(r);if(n)for(const s of n)try{s(e,r)}catch{}}getOrInitializeService({instanceIdentifier:e,options:r={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:ft(e),options:r}),this.instances.set(e,n),this.instancesOptions.set(e,r),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=T){return this.component?this.component.multipleInstances?e:T:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ft(t){return t===T?void 0:t}function pt(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const r=this.getProvider(e.name);if(r.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);r.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const r=new ht(e,this);return this.providers.set(e,r),r}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var u;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(u||(u={}));const mt={debug:u.DEBUG,verbose:u.VERBOSE,info:u.INFO,warn:u.WARN,error:u.ERROR,silent:u.SILENT},bt=u.INFO,_t={[u.DEBUG]:"log",[u.VERBOSE]:"log",[u.INFO]:"info",[u.WARN]:"warn",[u.ERROR]:"error"},yt=(t,e,...r)=>{if(e<t.logLevel)return;const n=new Date().toISOString(),s=_t[e];if(s)console[s](`[${n}]  ${t.name}:`,...r);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class vt{constructor(e){this.name=e,this._logLevel=bt,this._logHandler=yt,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in u))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?mt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,u.DEBUG,...e),this._logHandler(this,u.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,u.VERBOSE,...e),this._logHandler(this,u.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,u.INFO,...e),this._logHandler(this,u.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,u.WARN,...e),this._logHandler(this,u.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,u.ERROR,...e),this._logHandler(this,u.ERROR,...e)}}const wt=(t,e)=>e.some(r=>t instanceof r);let he,fe;function xt(){return he||(he=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Et(){return fe||(fe=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Te=new WeakMap,re=new WeakMap,Se=new WeakMap,Y=new WeakMap,oe=new WeakMap;function It(t){const e=new Promise((r,n)=>{const s=()=>{t.removeEventListener("success",a),t.removeEventListener("error",i)},a=()=>{r(A(t.result)),s()},i=()=>{n(t.error),s()};t.addEventListener("success",a),t.addEventListener("error",i)});return e.then(r=>{r instanceof IDBCursor&&Te.set(r,t)}).catch(()=>{}),oe.set(e,t),e}function kt(t){if(re.has(t))return;const e=new Promise((r,n)=>{const s=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",i),t.removeEventListener("abort",i)},a=()=>{r(),s()},i=()=>{n(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",a),t.addEventListener("error",i),t.addEventListener("abort",i)});re.set(t,e)}let ne={get(t,e,r){if(t instanceof IDBTransaction){if(e==="done")return re.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Se.get(t);if(e==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return A(t[e])},set(t,e,r){return t[e]=r,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Dt(t){ne=t(ne)}function Nt(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...r){const n=t.call(X(this),e,...r);return Se.set(n,e.sort?e.sort():[e]),A(n)}:Et().includes(t)?function(...e){return t.apply(X(this),e),A(Te.get(this))}:function(...e){return A(t.apply(X(this),e))}}function At(t){return typeof t=="function"?Nt(t):(t instanceof IDBTransaction&&kt(t),wt(t,xt())?new Proxy(t,ne):t)}function A(t){if(t instanceof IDBRequest)return It(t);if(Y.has(t))return Y.get(t);const e=At(t);return e!==t&&(Y.set(t,e),oe.set(e,t)),e}const X=t=>oe.get(t);function Ct(t,e,{blocked:r,upgrade:n,blocking:s,terminated:a}={}){const i=indexedDB.open(t,e),l=A(i);return n&&i.addEventListener("upgradeneeded",c=>{n(A(i.result),c.oldVersion,c.newVersion,A(i.transaction),c)}),r&&i.addEventListener("blocked",c=>r(c.oldVersion,c.newVersion,c)),l.then(c=>{a&&c.addEventListener("close",()=>a()),s&&c.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const Tt=["get","getKey","getAll","getAllKeys","count"],St=["put","add","delete","clear"],Z=new Map;function pe(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Z.get(e))return Z.get(e);const r=e.replace(/FromIndex$/,""),n=e!==r,s=St.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Tt.includes(r)))return;const a=async function(i,...l){const c=this.transaction(i,s?"readwrite":"readonly");let d=c.store;return n&&(d=d.index(l.shift())),(await Promise.all([d[r](...l),s&&c.done]))[0]};return Z.set(e,a),a}Dt(t=>({...t,get:(e,r,n)=>pe(e,r)||t.get(e,r,n),has:(e,r)=>!!pe(e,r)||t.has(e,r)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(r=>{if(Ot(r)){const n=r.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(r=>r).join(" ")}}function Ot(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const se="@firebase/app",ge="0.12.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D=new vt("@firebase/app"),Bt="@firebase/app-compat",Pt="@firebase/analytics-compat",jt="@firebase/analytics",Mt="@firebase/app-check-compat",Lt="@firebase/app-check",$t="@firebase/auth",Ut="@firebase/auth-compat",Ft="@firebase/database",Ht="@firebase/data-connect",Vt="@firebase/database-compat",zt="@firebase/functions",Wt="@firebase/functions-compat",Gt="@firebase/installations",Kt="@firebase/installations-compat",qt="@firebase/messaging",Jt="@firebase/messaging-compat",Yt="@firebase/performance",Xt="@firebase/performance-compat",Zt="@firebase/remote-config",Qt="@firebase/remote-config-compat",er="@firebase/storage",tr="@firebase/storage-compat",rr="@firebase/firestore",nr="@firebase/vertexai",sr="@firebase/firestore-compat",ar="firebase",ir="11.7.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ae="[DEFAULT]",or={[se]:"fire-core",[Bt]:"fire-core-compat",[jt]:"fire-analytics",[Pt]:"fire-analytics-compat",[Lt]:"fire-app-check",[Mt]:"fire-app-check-compat",[$t]:"fire-auth",[Ut]:"fire-auth-compat",[Ft]:"fire-rtdb",[Ht]:"fire-data-connect",[Vt]:"fire-rtdb-compat",[zt]:"fire-fn",[Wt]:"fire-fn-compat",[Gt]:"fire-iid",[Kt]:"fire-iid-compat",[qt]:"fire-fcm",[Jt]:"fire-fcm-compat",[Yt]:"fire-perf",[Xt]:"fire-perf-compat",[Zt]:"fire-rc",[Qt]:"fire-rc-compat",[er]:"fire-gcs",[tr]:"fire-gcs-compat",[rr]:"fire-fst",[sr]:"fire-fst-compat",[nr]:"fire-vertex","fire-js":"fire-js",[ar]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W=new Map,cr=new Map,ie=new Map;function me(t,e){try{t.container.addComponent(e)}catch(r){D.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,r)}}function G(t){const e=t.name;if(ie.has(e))return D.debug(`There were multiple attempts to register component ${e}.`),!1;ie.set(e,t);for(const r of W.values())me(r,t);for(const r of cr.values())me(r,t);return!0}function lr(t,e){const r=t.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),t.container.getProvider(e)}function dr(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},C=new Ce("app","Firebase",ur);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,r,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},r),this._name=r.name,this._automaticDataCollectionEnabled=r.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new L("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw C.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=ir;function Re(t,e={}){let r=t;typeof e!="object"&&(e={name:e});const n=Object.assign({name:ae,automaticDataCollectionEnabled:!1},e),s=n.name;if(typeof s!="string"||!s)throw C.create("bad-app-name",{appName:String(s)});if(r||(r=Ae()),!r)throw C.create("no-options");const a=W.get(s);if(a){if(te(r,a.options)&&te(n,a.config))return a;throw C.create("duplicate-app",{appName:s})}const i=new gt(s);for(const c of ie.values())i.addComponent(c);const l=new hr(r,n,i);return W.set(s,l),l}function pr(t=ae){const e=W.get(t);if(!e&&t===ae&&Ae())return Re();if(!e)throw C.create("no-app",{appName:t});return e}function O(t,e,r){var n;let s=(n=or[t])!==null&&n!==void 0?n:t;r&&(s+=`-${r}`);const a=s.match(/\s|\//),i=e.match(/\s|\//);if(a||i){const l=[`Unable to register library "${s}" with version "${e}":`];a&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&i&&l.push("and"),i&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),D.warn(l.join(" "));return}G(new L(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr="firebase-heartbeat-database",mr=1,$="firebase-heartbeat-store";let Q=null;function Oe(){return Q||(Q=Ct(gr,mr,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore($)}catch(r){console.warn(r)}}}}).catch(t=>{throw C.create("idb-open",{originalErrorMessage:t.message})})),Q}async function br(t){try{const r=(await Oe()).transaction($),n=await r.objectStore($).get(Be(t));return await r.done,n}catch(e){if(e instanceof B)D.warn(e.message);else{const r=C.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});D.warn(r.message)}}}async function be(t,e){try{const n=(await Oe()).transaction($,"readwrite");await n.objectStore($).put(e,Be(t)),await n.done}catch(r){if(r instanceof B)D.warn(r.message);else{const n=C.create("idb-set",{originalErrorMessage:r==null?void 0:r.message});D.warn(n.message)}}}function Be(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _r=1024,yr=30;class vr{constructor(e){this.container=e,this._heartbeatsCache=null;const r=this.container.getProvider("app").getImmediate();this._storage=new xr(r),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,r;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=_e();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((r=this._heartbeatsCache)===null||r===void 0?void 0:r.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(i=>i.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>yr){const i=Er(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){D.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const r=_e(),{heartbeatsToSend:n,unsentEntries:s}=wr(this._heartbeatsCache.heartbeats),a=z(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=r,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(r){return D.warn(r),""}}}function _e(){return new Date().toISOString().substring(0,10)}function wr(t,e=_r){const r=[];let n=t.slice();for(const s of t){const a=r.find(i=>i.agent===s.agent);if(a){if(a.dates.push(s.date),ye(r)>e){a.dates.pop();break}}else if(r.push({agent:s.agent,dates:[s.date]}),ye(r)>e){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}class xr{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return st()?at().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const r=await br(this.app);return r!=null&&r.heartbeats?r:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var r;if(await this._canUseIndexedDBPromise){const s=await this.read();return be(this.app,{lastSentHeartbeatDate:(r=e.lastSentHeartbeatDate)!==null&&r!==void 0?r:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var r;if(await this._canUseIndexedDBPromise){const s=await this.read();return be(this.app,{lastSentHeartbeatDate:(r=e.lastSentHeartbeatDate)!==null&&r!==void 0?r:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ye(t){return z(JSON.stringify({version:2,heartbeats:t})).length}function Er(t){if(t.length===0)return-1;let e=0,r=t[0].date;for(let n=1;n<t.length;n++)t[n].date<r&&(r=t[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ir(t){G(new L("platform-logger",e=>new Rt(e),"PRIVATE")),G(new L("heartbeat",e=>new vr(e),"PRIVATE")),O(se,ge,t),O(se,ge,"esm2017"),O("fire-js","")}Ir("");var kr="firebase",Dr="11.7.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */O(kr,Dr,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pe="firebasestorage.googleapis.com",Nr="storageBucket",Ar=2*60*1e3,Cr=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I extends B{constructor(e,r,n=0){super(ee(e),`Firebase Storage: ${r} (${ee(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,I.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return ee(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var E;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(E||(E={}));function ee(t){return"storage/"+t}function Tr(){const t="An unknown error occurred, please check the error payload for server response.";return new I(E.UNKNOWN,t)}function Sr(){return new I(E.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Rr(){return new I(E.CANCELED,"User canceled the upload/download.")}function Or(t){return new I(E.INVALID_URL,"Invalid URL '"+t+"'.")}function Br(t){return new I(E.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function ve(t){return new I(E.INVALID_ARGUMENT,t)}function je(){return new I(E.APP_DELETED,"The Firebase app was deleted.")}function Pr(t){return new I(E.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e,r){this.bucket=e,this.path_=r}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,r){let n;try{n=v.makeFromUrl(e,r)}catch{return new v(e,"")}if(n.path==="")return n;throw Br(e)}static makeFromUrl(e,r){let n=null;const s="([A-Za-z0-9.\\-_]+)";function a(m){m.path.charAt(m.path.length-1)==="/"&&(m.path_=m.path_.slice(0,-1))}const i="(/(.*))?$",l=new RegExp("^gs://"+s+i,"i"),c={bucket:1,path:3};function d(m){m.path_=decodeURIComponent(m.path)}const h="v[A-Za-z0-9_]+",p=r.replace(/[.]/g,"\\."),f="(/([^?#]*).*)?$",b=new RegExp(`^https?://${p}/${h}/b/${s}/o${f}`,"i"),k={bucket:1,path:3},N=r===Pe?"(?:storage.googleapis.com|storage.cloud.google.com)":r,g="([^?#]*)",S=new RegExp(`^https?://${N}/${s}/${g}`,"i"),_=[{regex:l,indices:c,postModify:a},{regex:b,indices:k,postModify:d},{regex:S,indices:{bucket:1,path:2},postModify:d}];for(let m=0;m<_.length;m++){const R=_[m],y=R.regex.exec(e);if(y){const F=y[R.indices.bucket];let P=y[R.indices.path];P||(P=""),n=new v(F,P),R.postModify(n);break}}if(n==null)throw Or(e);return n}}class jr{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mr(t,e,r){let n=1,s=null,a=null,i=!1,l=0;function c(){return l===2}let d=!1;function h(...g){d||(d=!0,e.apply(null,g))}function p(g){s=setTimeout(()=>{s=null,t(b,c())},g)}function f(){a&&clearTimeout(a)}function b(g,...S){if(d){f();return}if(g){f(),h.call(null,g,...S);return}if(c()||i){f(),h.call(null,g,...S);return}n<64&&(n*=2);let _;l===1?(l=2,_=0):_=(n+Math.random())*1e3,p(_)}let k=!1;function N(g){k||(k=!0,f(),!d&&(s!==null?(g||(l=2),clearTimeout(s),p(0)):g||(l=1)))}return p(0),a=setTimeout(()=>{i=!0,N(!0)},r),N}function Lr(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $r(t){return t!==void 0}function we(t,e,r,n){if(n<e)throw ve(`Invalid value for '${t}'. Expected ${e} or greater.`);if(n>r)throw ve(`Invalid value for '${t}'. Expected ${r} or less.`)}function Ur(t){const e=encodeURIComponent;let r="?";for(const n in t)if(t.hasOwnProperty(n)){const s=e(n)+"="+e(t[n]);r=r+s+"&"}return r=r.slice(0,-1),r}var K;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(K||(K={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fr(t,e){const r=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,a=e.indexOf(t)!==-1;return r||s||a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e,r,n,s,a,i,l,c,d,h,p,f=!0,b=!1){this.url_=e,this.method_=r,this.headers_=n,this.body_=s,this.successCodes_=a,this.additionalRetryCodes_=i,this.callback_=l,this.errorCallback_=c,this.timeout_=d,this.progressCallback_=h,this.connectionFactory_=p,this.retry=f,this.isUsingEmulator=b,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((k,N)=>{this.resolve_=k,this.reject_=N,this.start_()})}start_(){const e=(n,s)=>{if(s){n(!1,new V(!1,null,!0));return}const a=this.connectionFactory_();this.pendingConnection_=a;const i=l=>{const c=l.loaded,d=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,d)};this.progressCallback_!==null&&a.addUploadProgressListener(i),a.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&a.removeUploadProgressListener(i),this.pendingConnection_=null;const l=a.getErrorCode()===K.NO_ERROR,c=a.getStatus();if(!l||Fr(c,this.additionalRetryCodes_)&&this.retry){const h=a.getErrorCode()===K.ABORT;n(!1,new V(!1,null,h));return}const d=this.successCodes_.indexOf(c)!==-1;n(!0,new V(d,a))})},r=(n,s)=>{const a=this.resolve_,i=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());$r(c)?a(c):a()}catch(c){i(c)}else if(l!==null){const c=Tr();c.serverResponse=l.getErrorText(),this.errorCallback_?i(this.errorCallback_(l,c)):i(c)}else if(s.canceled){const c=this.appDelete_?je():Rr();i(c)}else{const c=Sr();i(c)}};this.canceled_?r(!1,new V(!1,null,!0)):this.backoffId_=Mr(e,r,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Lr(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class V{constructor(e,r,n){this.wasSuccessCode=e,this.connection=r,this.canceled=!!n}}function Vr(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function zr(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Wr(t,e){e&&(t["X-Firebase-GMPID"]=e)}function Gr(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function Kr(t,e,r,n,s,a,i=!0,l=!1){const c=Ur(t.urlParams),d=t.url+c,h=Object.assign({},t.headers);return Wr(h,e),Vr(h,r),zr(h,a),Gr(h,n),new Hr(d,t.method,h,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,i,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function Jr(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e,r){this._service=e,r instanceof v?this._location=r:this._location=v.makeFromUrl(r,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,r){return new q(e,r)}get root(){const e=new v(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Jr(this._location.path)}get storage(){return this._service}get parent(){const e=qr(this._location.path);if(e===null)return null;const r=new v(this._location.bucket,e);return new q(this._service,r)}_throwIfRoot(e){if(this._location.path==="")throw Pr(e)}}function xe(t,e){const r=e==null?void 0:e[Nr];return r==null?null:v.makeFromBucketSpec(r,t)}function Yr(t,e,r,n={}){t.host=`${e}:${r}`;const s=dt(e);s&&ut(`https://${t.host}`),t._isUsingEmulator=!0,t._protocol=s?"https":"http";const{mockUserToken:a}=n;a&&(t._overrideAuthToken=typeof a=="string"?a:nt(a,t.app.options.projectId))}class Xr{constructor(e,r,n,s,a,i=!1){this.app=e,this._authProvider=r,this._appCheckProvider=n,this._url=s,this._firebaseVersion=a,this._isUsingEmulator=i,this._bucket=null,this._host=Pe,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ar,this._maxUploadRetryTime=Cr,this._requests=new Set,s!=null?this._bucket=v.makeFromBucketSpec(s,this._host):this._bucket=xe(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=v.makeFromBucketSpec(this._url,e):this._bucket=xe(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){we("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){we("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const r=await e.getToken();if(r!==null)return r.accessToken}return null}async _getAppCheckToken(){if(dr(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new q(this,e)}_makeRequest(e,r,n,s,a=!0){if(this._deleted)return new jr(je());{const i=Kr(e,this._appId,n,s,r,this._firebaseVersion,a,this._isUsingEmulator);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(e,r){const[n,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,r,n,s).getPromise()}}const Ee="@firebase/storage",Ie="0.13.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me="storage";function Zr(t=pr(),e){t=lt(t);const n=lr(t,Me).getImmediate({identifier:e}),s=tt("storage");return s&&Qr(n,...s),n}function Qr(t,e,r,n={}){Yr(t,e,r,n)}function en(t,{instanceIdentifier:e}){const r=t.getProvider("app").getImmediate(),n=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new Xr(r,n,s,e,fr)}function tn(){G(new L(Me,en,"PUBLIC").setMultipleInstances(!0)),O(Ee,Ie,""),O(Ee,Ie,"esm2017")}tn();const rn={apiKey:"AIzaSyDWT1yBLU13xb_MDoTybda3IPb2CpzXHt0",authDomain:"mern-estate-9967e.firebaseapp.com",projectId:"mern-estate-9967e",storageBucket:"mern-estate-9967e.appspot.com",messagingSenderId:"527361866180",appId:"1:527361866180:web:4f045909ee5b0cd85c0c91"},nn=Re(rn);Zr(nn);const on=()=>{const[t,e]=x.useState(!1),[r,n]=x.useState(""),[s,a]=x.useState(!1),[i,l]=x.useState(""),[c,d]=x.useState(!1),[h,p]=x.useState(!1),[f,b]=x.useState(""),[k,N]=x.useState(""),[g,S]=x.useState(""),[U,_]=x.useState(!1),{setUser:m}=He(),R=Ve(),y=w=>le.error(w),F=w=>le.success(w),P=async()=>{if(!i){y("Please enter the OTP.");return}p(!0),setTimeout(()=>{i===r.toString()?(a(!0),e(!1),F("Email verified successfully!")):y("Invalid OTP. Please try again."),p(!1)},500)},Le=async w=>{w.preventDefault(),N(""),S(""),_(!0);const j=new FormData(w.target),$e=j.get("fullName"),J=j.get("password"),Ue=j.get("confirmPassword"),ce=j.get("phone"),Fe=j.get("role");if(J.length<8){y("Password must be at least 8 characters long."),_(!1);return}if(J!==Ue){y("Passwords do not match."),_(!1);return}if(!/^[0-9]{10}$/.test(ce)){y("Mobile number must be exactly 10 digits."),_(!1);return}try{const M=await fetch("/api/users/signup",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:$e,email:f,phone:ce,password:J,photo:`https://api.dicebear.com/7.x/avataaars/svg?seed=${f}`,role:Fe})}),H=await M.json();if(console.log("Eror for signup is ",H),!M.ok){y(H.error||"Account creation failed.");return}localStorage.setItem("user",JSON.stringify(H.user)),m(H.user),F("Account created successfully! Redirecting..."),R("/")}catch(M){console.error("Signup error:",M),y(M.data.error||"Account creation failed.")}finally{_(!1)}};return o.jsxs("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4 font-inter dark:from-gray-900 dark:to-gray-800",children:[o.jsx("div",{className:"w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-100 mx-auto p-6 md:p-8 transform transition-all duration-300 hover:scale-[1.005] dark:bg-gray-800 dark:border-gray-700",children:o.jsxs("div",{className:"space-y-6 md:space-y-7",children:[o.jsxs("h1",{className:"text-3xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-4xl text-center dark:text-white",children:["Create Your Account",o.jsx("p",{className:"text-base font-medium text-gray-500 mt-2 dark:text-gray-400",children:"Join us to get started on your journey!"})]}),o.jsxs("form",{className:"space-y-5 md:space-y-6",onSubmit:Le,children:[o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:o.jsx("svg",{className:"w-5 h-5 text-gray-400 dark:text-gray-500",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:o.jsx("path",{fillRule:"evenodd",d:"M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",clipRule:"evenodd"})})}),o.jsx("input",{type:"text",name:"fullName",id:"fullName",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 shadow-sm transition-all duration-200 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400",placeholder:"Full Name",required:!0})]}),o.jsx("div",{className:"flex flex-col sm:flex-row bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:focus-within:ring-blue-600 dark:focus-within:border-blue-600",children:o.jsxs("div",{className:"relative flex-grow",children:[o.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:o.jsxs("svg",{className:"w-5 h-5 text-gray-400 dark:text-gray-500",fill:"currentColor",viewBox:"0 0 20 20",children:[o.jsx("path",{d:"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"}),o.jsx("path",{d:"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"})]})}),o.jsx("input",{type:"email",name:"email",id:"email",value:f,disabled:s||c||h,onChange:w=>b(w.target.value),className:"bg-transparent text-gray-900 sm:text-sm block w-full pl-10 pr-3 py-3 placeholder-gray-400 focus:outline-none dark:text-white dark:placeholder-gray-400",placeholder:"Email Address",required:!0})]})}),t&&!s&&o.jsxs("div",{className:"flex flex-col sm:flex-row bg-gray-50 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:focus-within:ring-blue-600 dark:focus-within:border-blue-600",children:[o.jsx("input",{type:"text",name:"otp",placeholder:"Enter OTP",value:i,onChange:w=>l(w.target.value),className:"flex-grow bg-transparent text-gray-900 sm:text-sm block w-full p-3 placeholder-gray-400 focus:outline-none dark:text-white dark:placeholder-gray-400",required:!0}),o.jsx("button",{type:"button",id:"verifyotp",onClick:P,disabled:h||c,className:`flex-shrink-0 px-4 py-3 sm:py-0 sm:h-auto sm:w-auto text-sm font-medium rounded-r-lg sm:rounded-l-none sm:rounded-r-lg transition-all duration-300
                    ${h?"bg-gray-400 text-white cursor-not-allowed opacity-80 dark:bg-gray-600 dark:opacity-90":"bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"} flex items-center justify-center gap-2`,children:h?o.jsxs(o.Fragment,{children:[o.jsxs("svg",{className:"animate-spin h-4 w-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[o.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),o.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"})]}),"Verifying..."]}):"Verify OTP"})]}),o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:o.jsx("svg",{className:"w-5 h-5 text-gray-400 dark:text-gray-500",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:o.jsx("path",{fillRule:"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",clipRule:"evenodd"})})}),o.jsx("input",{type:"password",name:"password",id:"password",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 shadow-sm transition-all duration-200 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400",placeholder:"Password",required:!0})]}),o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:o.jsx("svg",{className:"w-5 h-5 text-gray-400 dark:text-gray-500",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:o.jsx("path",{fillRule:"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",clipRule:"evenodd"})})}),o.jsx("input",{type:"password",name:"confirmPassword",id:"confirmPassword",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 shadow-sm transition-all duration-200 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400",placeholder:"Confirm Password",required:!0})]}),o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:o.jsx("svg",{className:"w-5 h-5 text-gray-400 dark:text-gray-500",fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 5a2 2 0 012-2h3.586a1 1 0 01.707.293l2.414 2.414a1 1 0 010 1.414L10.414 8a1 1 0 000 1.414l4.172 4.172a1 1 0 001.414 0l1.879-1.879a1 1 0 011.414 0l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-1c-8.837 0-16-7.163-16-16V5z"})})}),o.jsx("input",{type:"tel",name:"phone",id:"phone",min:10,max:10,className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 shadow-sm transition-all duration-200 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400",placeholder:"Phone Number (e.g., 1234567890)",required:!0})]}),o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:o.jsx("svg",{className:"w-5 h-5 text-gray-400 dark:text-gray-500",fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5.121 17.804A4 4 0 017.757 16h8.486a4 4 0 012.636 1.804M15 11a3 3 0 10-6 0 3 3 0 006 0z"})})}),o.jsxs("select",{name:"role",id:"role",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 shadow-sm transition-all duration-200 appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400",required:!0,children:[o.jsx("option",{value:"",disabled:!0,selected:!0,className:"text-gray-400",children:"Select Your Role"}),o.jsx("option",{value:"user",children:"User"}),o.jsx("option",{value:"parking_owner",children:"Parking Owner"})]}),o.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300",children:o.jsx("svg",{className:"fill-current h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:o.jsx("path",{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"})})})]}),o.jsxs("div",{className:"flex items-start",children:[o.jsx("div",{className:"flex items-center h-5",children:o.jsx("input",{id:"terms","aria-describedby":"terms",type:"checkbox",className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800",required:!0})}),o.jsx("div",{className:"ml-3 text-sm",children:o.jsxs("label",{htmlFor:"terms",className:"text-gray-600 hover:text-gray-800 cursor-pointer dark:text-gray-400 dark:hover:text-gray-300",children:["I agree to the"," ",o.jsx("a",{href:"#",className:"text-blue-600 hover:underline font-medium transition-colors duration-200 dark:text-blue-400 dark:hover:underline",children:"Terms of Service"})," ","and"," ",o.jsx("a",{href:"#",className:"text-blue-600 hover:underline font-medium transition-colors duration-200 dark:text-blue-400 dark:hover:underline",children:"Privacy Policy"})]})})]}),o.jsx("button",{type:"submit",className:"w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-lg px-6 py-3.5 text-center transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",disabled:U||c||h,children:U?o.jsxs(o.Fragment,{children:[o.jsxs("svg",{className:"w-5 h-5 animate-spin text-white",fill:"none",viewBox:"0 0 24 24",children:[o.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),o.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8v8H4z"})]}),"Registering User..."]}):"Create Account"})]}),o.jsxs("p",{className:"text-sm text-center text-gray-600 mt-4 pt-4 border-t border-gray-200 dark:text-gray-400 dark:border-gray-700",children:["Already have an account?"," ",o.jsx("a",{href:"get-started",className:"text-blue-600 hover:underline font-semibold transition-colors duration-200 dark:text-blue-400 dark:hover:underline",children:"Sign in"})]})]})}),o.jsx(ze,{position:"top-right",autoClose:3e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,pauseOnHover:!0,theme:"colored"})]})};export{on as default};
