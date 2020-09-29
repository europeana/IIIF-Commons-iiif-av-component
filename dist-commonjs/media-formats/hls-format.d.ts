import { MediaOptions } from '../types/media-options';
import { MediaFormat } from './abstract-media-format';
export declare class HlsFormat extends MediaFormat {
    hls: any;
    constructor(source: string, options?: MediaOptions);
    attachTo(element: HTMLMediaElement): void;
}
