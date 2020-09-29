var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseComponent } from '@iiif/base-component';
import { VolumeEvents } from '../events/volume-events';
var AVVolumeControl = /** @class */ (function (_super) {
    __extends(AVVolumeControl, _super);
    function AVVolumeControl(options) {
        var _this = _super.call(this, options) || this;
        _this._lastVolume = 1;
        _this._data = {
            volume: 1,
        };
        _this._init();
        _this._resize();
        return _this;
    }
    AVVolumeControl.prototype._init = function () {
        var _this = this;
        var success = _super.prototype._init.call(this);
        this._$element = $(this.el);
        if (!success) {
            console.error('Component failed to initialise');
        }
        this._$volumeMute = $("\n      <button class=\"btn volume-mute\" title=\"" + this.options.data.content.mute + "\">\n          <i class=\"av-icon av-icon-mute on\" aria-hidden=\"true\"></i>" + this.options.data.content.mute + "\n      </button>\n    ");
        this._$volumeSlider = $('<div class="volume-slider"></div>');
        this._$element.append(this._$volumeMute, this._$volumeSlider);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var that = this;
        this._$volumeMute.on('touchstart click', function (e) {
            e.preventDefault();
            // start reducer
            if (_this._data.volume !== 0) {
                // mute
                _this._lastVolume = _this._data.volume;
                _this._data.volume = 0;
            }
            else {
                // unmute
                _this._data.volume = _this._lastVolume;
            }
            // end reducer
            _this.fire(VolumeEvents.VOLUME_CHANGED, _this._data.volume);
        });
        this._$volumeSlider.slider({
            value: that._data.volume,
            step: 0.1,
            orientation: 'horizontal',
            range: 'min',
            min: 0,
            max: 1,
            animate: false,
            create: function () {
                // no-op
            },
            slide: function (evt, ui) {
                // start reducer
                that._data.volume = ui.value;
                if (that._data.volume === 0) {
                    that._lastVolume = 0;
                }
                // end reducer
                that.fire(VolumeEvents.VOLUME_CHANGED, that._data.volume);
            },
            stop: function (evt, ui) {
                // No-op
            },
        });
        return success;
    };
    AVVolumeControl.prototype.set = function (data) {
        this._data = Object.assign(this._data, data);
        this._render();
    };
    AVVolumeControl.prototype._render = function () {
        if (this._data.volume !== undefined) {
            this._$volumeSlider.slider({
                value: this._data.volume,
            });
            if (this._data.volume === 0) {
                var label = this.options.data.content.unmute;
                this._$volumeMute.prop('title', label);
                this._$volumeMute.find('i').switchClass('on', 'off');
            }
            else {
                var label = this.options.data.content.mute;
                this._$volumeMute.prop('title', label);
                this._$volumeMute.find('i').switchClass('off', 'on');
            }
        }
    };
    AVVolumeControl.prototype._resize = function () {
        // no-op
    };
    return AVVolumeControl;
}(BaseComponent));
export { AVVolumeControl };
//# sourceMappingURL=volume-control.js.map