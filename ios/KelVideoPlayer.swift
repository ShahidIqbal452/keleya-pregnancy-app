//
//  KelVideoPlayer.swift
//  Keleya
//
//  Created by Shahid Iqbal on 29/08/2023.
//

import Foundation
import UIKit
import AVKit

@objc(KelVideoPlayer)
class KelVideoPlayer: UIViewController {
  
  @objc(playVideo:resolver:rejecter:)
  func playVideo(url:String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async { [weak self] in
      
      let player = AVPlayer(url: URL(string: url)!)
      let vc = AVPlayerViewController()
      vc.player = player

      UIApplication.shared.visibleViewController?.present(vc, animated: true) {
          vc.player?.play()
          resolver("video play success...")
      }
      
    }
    
    
  }
}

extension UIApplication {

    var visibleViewController: UIViewController? {

        guard let rootViewController = keyWindow?.rootViewController else {
            return nil
        }

        return getVisibleViewController(rootViewController)
    }

    private func getVisibleViewController(_ rootViewController: UIViewController) -> UIViewController? {

        if let presentedViewController = rootViewController.presentedViewController {
            return getVisibleViewController(presentedViewController)
        }

        if let navigationController = rootViewController as? UINavigationController {
            return navigationController.visibleViewController
        }

        if let tabBarController = rootViewController as? UITabBarController {
            return tabBarController.selectedViewController
        }

        return rootViewController
    }
}
