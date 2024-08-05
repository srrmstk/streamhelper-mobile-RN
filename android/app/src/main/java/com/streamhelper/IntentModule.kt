package com.streamhelper

import android.app.Activity
import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.*

class IntentModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  companion object {
    var promise: Promise? = null
  }

  override fun getName() = "IntentModule"

  @ReactMethod
  fun openIntent(uri: String, promise: Promise) {
    IntentModule.promise = promise
    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(uri))
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

    if (currentActivity == null) {
      promise.reject("", "Activity is null")
    }
    currentActivity?.startActivity(intent)
  }

}

