import type findMyWay  from 'find-my-way';
import { PluginHandler } from '.';
import fileUpload from 'express-fileupload';
export type AppConfig={
routerOptions?:findMyWay.Config<findMyWay.HTTPVersion.V1>,
plugins:PluginHandler[] ,
fileUploadOptions:fileUpload.Options
}