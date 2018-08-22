<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

</head>
<body>
	<div class="modal-header">
		<h3 class="modal-title" ng-bind = 'title'></h3>
	</div>
	<div class="modal-body">
		<ul>
			<li ng-repeat="item in its">
			<a ng-click="selected.item = item">{{item}}</a>
			</li>
			<div class="h2">
				当前选择1： <b>{{selected.item}}</b>
			</div>
		</ul>
		<br>
		 姓名：<input type="text" ng-model="person.name"><br>
		 学生工号：<input type="text" ng-model="stu.id" ng-disabled="true"><br>
		 学生年龄：<input type="text" ng-model="stu.age"><br>
	</div>
	<div class="modal-footer">
		<button class="btn btn-primary" ng-click="ok()">确认</button>
		<button class="btn btn-warning" ng-click="cancel()">退出</button>
	</div>
</body>
</html>