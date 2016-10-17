deploy:
	rhc env-set .env -a smithboys --confirm
	git push openshift master
