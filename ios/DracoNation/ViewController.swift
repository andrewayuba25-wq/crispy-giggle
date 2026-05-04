import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate {

    var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(red: 0.059, green: 0.059, blue: 0.102, alpha: 1.0)
        setupWebView()
        loadApp()
    }

    func setupWebView() {
        let config = WKWebViewConfiguration()
        config.preferences.javaScriptEnabled = true
        // Enable localStorage
        config.websiteDataStore = WKWebsiteDataStore.default()

        webView = WKWebView(frame: view.bounds, configuration: config)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.navigationDelegate = self
        webView.backgroundColor = UIColor(red: 0.059, green: 0.059, blue: 0.102, alpha: 1.0)
        webView.isOpaque = false
        webView.scrollView.bounces = false
        view.addSubview(webView)
    }

    func loadApp() {
        guard let path = Bundle.main.path(forResource: "sms-virtual-app", ofType: "html") else { return }
        let url = URL(fileURLWithPath: path)
        let request = URLRequest(url: url)
        webView.load(request)
    }

    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
}
