
/*
help for live object

{
    liveId: {live id},
    liveTitle: '{live title}',
    status: 'OPEN',
    liveImageUrl: '{live thumbnail url}',
    defaultThumbnailImageUrl: null,
    concurrentUserCount: {current viewers},
    accumulateCount: {total viewers},
    openDate: '{openDate}',
    closeDate: null,
    adult: false,
    chatChannelId: '{chat channel id}',
    categoryType: 'ETC',
    liveCategory: 'talk',
    liveCategoryValue: 'talk',
    chatActive: true,
    chatAvailableGroup: 'ALL',
    paidPromotion: false,
    chatAvailableCondition: 'NONE',
    minFollowerMinute: 0,
    channel: {
        channelId: '{channel id}',
        channelName: '{channel name}',
        channelImageUrl: '{channel profile image url}',
        verifiedMark: false
    },
    userAdultStatus: null,
    livePollingStatus: {
        status: 'STARTED',
        isPublishing: true,
        playableStatus: 'PLAYABLE',
        trafficThrottling: -1,
        callPeriodMilliSecond: 10000
    },
    livePlayback: {
        meta: {
            videoId: '{live video id}',
            streamSeq: {streamSeq},
            liveId: '{live id}',
            paidLive: false,
            cdnInfo: [Object],
            cmcdEnabled: false
        },
        serviceMeta: { contentType: 'VIDEO' },
        live: {
            start: '{live start time / same as `openDate`}',
            open: '{live open time}',
            timeMachine: false,
            status: '{started}'
        },
        thumbnail: {
            snapshotThumbnailTemplate: '{thumbnail template url / same as `liveImageUrl`}',
        },
        multiview: []
    }
    }
*/
