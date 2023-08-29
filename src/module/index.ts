import {NativeModules} from 'react-native';
const {KelVideoPlayer} = NativeModules;

export interface Response {
  status: string;
}

export interface KelVideoPlayer {
  playVideo(url: string): Promise<Response>;
}

export default KelVideoPlayer as KelVideoPlayer;
