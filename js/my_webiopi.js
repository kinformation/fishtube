function GPIO(gpio) {
  this.gpio = gpio;
  this.url = "/webiopi/GPIO/" + gpio + "/function";
}

GPIO.prototype.getFunction = function(callback) {
  var content = this;
  if (callback != undefined) {
    $.get(this.url, function(data) {
      content.updateFunction(content.gpio, data);
      callback(data);
    });
  }
}

GPIO.prototype.setFunction = function(func, callback) {
  $.post(this.url + '/' + func, function(data) {
    if (callback != undefined) {
      callback(gpio, data);
    }
  });
}

GPIO.prototype.updateFunction = function(gpio, func) {
  var stat = func == 'OUT' ? true : false;
  $("#function" + gpio).prop('checked', stat).change();
}

function Temperature(name) {
  this.name = name;
  this.url = "/webiopi/devices/" + name + "/sensor";
  this.refreshTime = 5000;
}

Temperature.prototype.getCelsius = function(callback) {
  $.get(this.url + "/temperature/c", function(data) {
    callback(data);
  });
}

Temperature.prototype.refresh = function() {
  var temp = this;
  var element = this.element;
  this.getCelsius(function(data) {
    if (element != undefined) {
      element.text(data + "°C");
    }
    setTimeout(function() {
      temp.refresh()
    }, temp.refreshTime);
  });
}

$(function() {
  // LED
  led = new GPIO(17);
  led.getFunction(function(data) {
    if (data == 'IN') {
      $("[data-gpio='17']").prop('checked', false).change()
    } else {
      $("[data-gpio='17']").prop('checked', true).change()
    }
  });
  led = new GPIO(27);
  led.getFunction(function(data) {
    if (data == 'IN') {
      $("[data-gpio='27']").prop('checked', false).change()
    } else {
      $("[data-gpio='27']").prop('checked', true).change()
    }
  });

  // Fan
  fan = new GPIO(18);
  fan.getFunction(function(data) {
    if (data == 'IN') {
      $("[data-gpio='18']").prop('checked', false).change()
    } else {
      $("[data-gpio='18']").prop('checked', true).change()
    }
  });

  // Temperature
  content = $(".webiopi-temp");
  device = new Temperature("temp2");
  device.refreshTime = 30000;
  device.element = $("<span>");
  device.refresh();
  content.append(device.element);
});
