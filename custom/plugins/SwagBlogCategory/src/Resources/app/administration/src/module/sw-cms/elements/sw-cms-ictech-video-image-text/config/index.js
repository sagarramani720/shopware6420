import template from './sw-cms-el-config-video-image-text.html.twig';
import './sw-cms-el-config-video-image-text.scss';

const { Component, Mixin } = Shopware;

/**
 * @private since v6.5.0
 * @package content
 */
Component.register('sw-cms-el-ictech-config-video-image-text', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
        };
    },

    computed: {
        startValue() {
            return this.convertTimeToInputFormat(this.element.config.start.value).string;
        },

        endValue() {
            return this.convertTimeToInputFormat(this.element.config.end.value).string;
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },
        videoID: {
            get() {
                return this.element.config.videoID.value;
            },

            set(link) {
                this.element.config.videoID.value = this.shortenLink(link);
            },
        },

        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        previewSource() {
            if (this.element.data && this.element.data.media && this.element.data.media.id) {
                return this.element.data.media;
            }

            return this.element.config.media.value;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('image');
            this.initElementConfig('youtube-video');
        },
        setTimeValue(value, type) {
            this.element.config[type].value = this.convertTimeToUrlFormat(value).string;
        },

        convertTimeToInputFormat(time) {
            /* converting the time to a human readable format.
             * e.g. 1337 (seconds) -> 22:17
             */

            const returnValues = {};
            let incomingTime = time;

            const regex = /^[0-9]*$/;
            const isValidFormat = regex.test(time);

            if (!isValidFormat) {
                incomingTime = 0;
            }

            const minutes = Math.floor(incomingTime / 60);
            let seconds = incomingTime - minutes * 60;

            returnValues.minutes = minutes;
            returnValues.seconds = seconds;

            if (seconds.toString().length === 1) {
                seconds = `0${seconds}`;
            }

            returnValues.string = `${minutes}:${seconds}`;

            return returnValues;
        },

        convertTimeToUrlFormat(time) {
            /* converting the time to an url format so the YouTube iFrame-API can read the time.
             * e.g. 0:42 -> 42 (seconds)
             */

            const returnValues = {};
            let incomingTime = time;

            const regex = /[0-9]?[0-9]:[0-9][0-9]/;
            const isValidFormat = regex.test(incomingTime);

            if (!isValidFormat) {
                incomingTime = '00:00';
            }

            const splittedTime = incomingTime.split(':');
            returnValues.minutes = Number(splittedTime[0]);
            returnValues.seconds = Number(splittedTime[1]);
            returnValues.string = returnValues.minutes * 60 + returnValues.seconds;

            return returnValues;
        },

        shortenLink(link) {
            let incomingLink = link;

            /* shareLink is the link you get when you click the share button under a YouTube video.
             *  e.g. https://youtu.be/bG57TZPYsyw
             *
             * urlLink is the link of the YouTube video from the searchbar. e.g. https://www.youtube.com/watch?v=bG57TZPYsyw
             */

            const shareLink = /https\:\/\/youtu\.be\//;
            const linkType = shareLink.test(incomingLink) ? 'shareLink' : 'urlLink';

            if (linkType === 'shareLink') {
                const linkPrefix = /https\:\/\/youtu\.be\//;
                const linkPostfix = /\?/;

                incomingLink = incomingLink.replace(linkPrefix, '');

                if (linkPostfix.test(incomingLink)) {
                    const positionOfPostfix = linkPostfix.exec(incomingLink).index;
                    incomingLink = incomingLink.substring(0, positionOfPostfix);
                }
            } else {
                const linkPrefix = /https\:\/\/www\.youtube\.com\/watch\?v\=/;
                const linkPostfix = /\&/;

                if (linkPrefix.test(incomingLink)) {
                    // removing the https://www...
                    incomingLink = incomingLink.replace(linkPrefix, '');
                }

                if (linkPostfix.test(incomingLink)) {
                    /* removing everthing that comes after the video id.
                     * Example: bG57TZPYsyw&t=3s -> bG57TZPYsyw
                     */

                    const positionOfPostfix = linkPostfix.exec(incomingLink).index;
                    incomingLink = incomingLink.substring(0, positionOfPostfix);
                }
            }

            return incomingLink;
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId);

            this.element.config.media.value = mediaEntity.id;
            this.element.config.media.source = 'static';

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.media.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.media.value = media.id;
            this.element.config.media.source = 'static';

            this.updateElementData(media);

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const mediaId = media === null ? null : media.id;
            if (!this.element.data) {
                this.$set(this.element, 'data', { mediaId, media });
            } else {
                this.$set(this.element.data, 'mediaId', mediaId);
                this.$set(this.element.data, 'media', media);
            }
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onChangeMinHeight(value) {
            this.element.config.minHeight.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangeDisplayMode(value) {
            if (value === 'cover') {
                this.element.config.verticalAlign.value = null;
            }

            this.$emit('element-update', this.element);
        },
    },
});
