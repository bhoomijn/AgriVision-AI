# crop_monitor.py
# AI-powered crop monitoring MVP for Build in AI Hackathon

def detect_crop_issue(temperature, humidity):
    if temperature > 35 and humidity < 30:
        return "Alert: Possible drought stress!"
    elif temperature < 15 and humidity > 70:
        return "Alert: Possible fungal risk!"
    else:
        return "Crop conditions normal."

# Example run
if __name__ == "__main__":
    temp = 36
    hum = 25
    print(detect_crop_issue(temp, hum))
