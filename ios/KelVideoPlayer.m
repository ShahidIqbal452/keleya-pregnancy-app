//
//  KelVideoPlayer.m
//  Keleya
//
//  Created by Shahid Iqbal on 29/08/2023.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(KelVideoPlayer, UIViewController)

RCT_EXTERN_METHOD(playVideo: (NSString*)url resolver: (RCTPromiseResolveBlock) resolve rejecter: (RCTPromiseRejectBlock) reject)

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

@end
