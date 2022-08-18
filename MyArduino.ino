#include <Servo.h>
Servo arm;
void setup() {
  // put your setup code here, to run once:
Serial.begin(115200);
  arm.attach(9);
}

void loop() {
  // put your main code here, to run repeatedly:
  String data= Serial.readString();
    if (data.indexOf("right") > -1){
      arm.write(0);
      Serial.println(2);
      delay(100);
    }
    if(data.indexOf("left") > -1){
      arm.write(180);
      Serial.println(1);
      delay(100);
    }
      
    }
