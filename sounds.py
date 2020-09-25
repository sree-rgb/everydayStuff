class Alert:
	def __init__(self,title,filename):
		self.title=title
		self.filename=filename
	def getFilename(self):
		return self.filename
	def getTitle(self):
		return self.title
	def getInfo(self):
		return {'title':self.title,'filename':self.filename}
class Alerts:
	def __init__(self,pickle_filename):
		self.alerts=[]
		self.selected_alert=0
		self.pickle_filename=pickle_filename
	def addAlert(self,alert):
		assert isinstance(alert,Alert),'alert is not of type Alert'
		self.alerts.append(alert)
	def getAlerts(self):
		return self.alerts
	def getSelecetedAlert(self):
		return self.selected_alert
	def getInfos(self):
		infos=[x.getInfo() for x in self.alerts]
		for x in range(len(infos)):
			infos[x]['file_id']=x
		return infos
	def savePickle(self):
		import pickle
		pickle_file=open(self.pickle_filename,'wb')
		pickle.dump(self,pickle_file)
		pickle_file.close()
	def loadPickle(pickle_filename):
		import pickle
		pickle_file=open(pickle_filename,'rb')
		alert_file=pickle.load(pickle_file)
		return alert_file
	def getCurrentAlertFile(self):
		return self.alerts[self.selected_alert].getFilename()
	def selectAlert(self,alert_id):
		assert 0 <= alert_id < len(self.alerts),'wrong alert id'
		self.selected_alert=alert_id
def restoreDefaultAlerts(default_pickle_filename):
	# Only call from application
	A=Alerts(default_pickle_filename)
	A1=Alert('Text Message 1','alert1.wav')
	A2=Alert('Spaceship','alert2.wav')
	A3=Alert('Bell','alert3.wav')
	for x in [A1,A2,A3]:
		A.addAlert(x)
	A.savePickle()

if __name__ == '__main__':
	default_pickle_filename='alerts.pkl'
	def printAlertsInfos():
		A=Alerts.loadPickle(default_pickle_filename)
		print(A.getInfos())
		print(A.selectAlert(1))
	# restoreDefaultAlerts()
	printAlertsInfos()
# 	