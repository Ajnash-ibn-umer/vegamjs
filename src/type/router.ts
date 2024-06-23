import type findMyWay  from 'find-my-way';
import { PluginHandler } from './index.js';

export type AppConfig={
routerOptions?:findMyWay.Config<findMyWay.HTTPVersion.V1>,
plugins?:PluginHandler[] ,
fileUploadOptions?:any
}