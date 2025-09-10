input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    WiFi.resetModule()
})
WiFi.startPermanentListener()
if (!(WiFi.isWiFiAndMQTTReady())) {
    basic.showString("setup", 70)
    WiFi.setupWifi("..","..")
    if (WiFi.checkWiFiConnection()) {
        WiFi.setupMQTT(
        )
    }
}
let logging = true
WiFi.publishMQTT("hugoCal/feeds/test", "hi from mini")
WiFi.subscribeMQTT("hugoCal/feeds/button", 0)
WiFi.subscribeMQTT("hugoCal/feeds/slider", 0)
WiFi.startMQTTListener()
basic.forever(function () {
    if (WiFi.getMQTTTopicValue("hugoCal/feeds/button") == "ON") {
        basic.setLedColor(0xffff00)
    } else {
        basic.turnRgbLedOff()
    }
    led.plotBarGraph(
    parseFloat(WiFi.getMQTTTopicValue("hugoCal/feeds/slider")),
    100
    )
    basic.pause(500)
})
loops.everyInterval(20000, function () {
    if (logging) {
        WiFi.publishMQTT("hugoCal/feeds/light", convertToText(input.lightLevel()))
        WiFi.publishMQTT("hugoCal/feeds/temperature", convertToText(input.temperature()))
    }
})

