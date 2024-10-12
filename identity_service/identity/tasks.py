# tasks.py (inside one of your Django apps)
import smtplib
from celery import shared_task

@shared_task
def sendEmail(to:str, smtp_hostname, smtp_username, smtp_password, smtp_port, msg):
    s = smtplib.SMTP(smtp_hostname, smtp_port, timeout=5)
    s.starttls()
    s.login(smtp_username, smtp_password)
    s.sendmail(smtp_username,[to], msg)
    s.quit()
    return True