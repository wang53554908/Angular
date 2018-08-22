package com.sky.admin.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;



import com.sky.admin.dao.MenuMapper;
import com.sky.admin.dao.ResMenuMapper;
import com.sky.admin.entity.Employee;
import com.sky.admin.entity.Menu;
import com.sky.admin.entity.ResMenu;
import com.sky.admin.security.UserUtils;
import com.sky.admin.service.MenuService;
import com.sky.common.entity.Page;

@Service
public class MenuServiceImpl implements MenuService {
	@Resource
    private MenuMapper menuMapper; 
	
	@Resource
	private ResMenuMapper resMenuMapper;
	
	@Override
	public List<Menu> findAll(Page<Menu> page) {
		return this.menuMapper.select(page);
	}

	@Override
	public Menu findOne(String id) {
		// TODO Auto-generated method stub
		return this.menuMapper.findOne(id);
	}

	@Override
	public void update(Menu emp) {
		// TODO Auto-generated method stub
		this.menuMapper.update(emp);
	}

	@Override
	public Menu save(Menu emp) {
		// TODO Auto-generated method stub
		this.menuMapper.save(emp);
		return emp;
	}
	
	public List<Menu> getMenuTree(Menu menu) {
		Set<String> urlPermissions = UserUtils.getUrlPermissions();
		List<Menu> menuList = new ArrayList<Menu>();//最终结果
		List<Menu> parentMenuList = this.menuMapper.findRootMenuList(menu);//一级菜单
		if(CollectionUtils.isEmpty(parentMenuList)) return menuList;
		for(Menu parentMenu : parentMenuList){
			if(!urlPermissions.contains(String.valueOf(parentMenu.getId()))){
				continue;
			}
			parentMenu.setLabel(parentMenu.getName());
			menuList.add(parentMenu);
		}
		for(Menu m : menuList){
			m.setChildMenus(getChild(m.getId(),menu));
			m.setChildren(getChild(m.getId(),menu));
		}
		return menuList;
	}

	@Override
	public List<Menu> getMenuTree(Menu menu,Integer resId) {
		List<Integer> resMenuIds = null;
		if(resId != null){
			resMenuIds = getResMenuList(resId);
		}
		List<Menu> menuList = new ArrayList<Menu>();//最终结果
		List<Menu> parentMenuList = this.menuMapper.findRootMenuList(menu);//一级菜单
		if(CollectionUtils.isEmpty(parentMenuList)) return menuList;
		for(Menu parentMenu : parentMenuList){
			setResMenuChecked(resMenuIds, parentMenu);
			parentMenu.setLabel(parentMenu.getName());
			menuList.add(parentMenu);
		}
		for(Menu m : menuList){
			m.setChildMenus(getChild(m.getId(),menu,resMenuIds));
			m.setChildren(getChild(m.getId(),menu,resMenuIds));
		}
		return menuList;
	}

	private List<Menu> getChild(Integer id,Menu menu,List<Integer> resMenuIds) {
		List<Menu> childList = new ArrayList<Menu>();//子菜单
		menu.setParentId(id);
		List<Menu> cList = this.menuMapper.findChildMenuList(menu);
		if(CollectionUtils.isEmpty(cList)) return childList;
		for(Menu m : cList){
			setResMenuChecked(resMenuIds, m);
			m.setLabel(m.getName());
			childList.add(m);
		}
		//把子部门循环一遍
		for(Menu m : childList){
			m.setChildMenus(getChild(m.getId(), menu,resMenuIds));
			m.setChildren(getChild(m.getId(), menu,resMenuIds));
		}
		return childList;
	}
	
	private List<Menu> getChild(Integer id,Menu menu) {
		Set<String> urlPermissions = UserUtils.getUrlPermissions();
		List<Menu> childList = new ArrayList<Menu>();//子菜单
		menu.setParentId(id);
		List<Menu> cList = this.menuMapper.findChildMenuList(menu);
		if(CollectionUtils.isEmpty(cList)) return childList;
		for(Menu m : cList){
			if(!urlPermissions.contains(String.valueOf(m.getId()))){
				continue;
			}
			m.setLabel(m.getName());
			childList.add(m);
		}
		//把子部门循环一遍
		for(Menu m : childList){
			m.setChildMenus(getChild(m.getId(), menu));
			m.setChildren(getChild(m.getId(), menu));
		}
		return childList;
	}

	@Override
	public List<Menu> getMenuTreeSelect() {
//		Employee emp = new Employee();
		List<Menu> menuList = new ArrayList<Menu>();//最终结果
//		List<Employee> parentEmpList = this.empMapper.findRootEmpList(emp);//一级部门
//		if(CollectionUtils.isEmpty(parentEmpList)) return empList;
//		for(Employee parentEmp : parentEmpList){
//			empList.add(parentEmp);
//		}
//		for(Employee employee : parentEmpList){
//			empList.addAll(setEmpList(employee.getId(),emp));
//		}
		return menuList;
	}
	
	@SuppressWarnings("unused")
	private List<Employee> setEmpList(Integer id,Employee emp) {
		List<Employee> childList = new ArrayList<Employee>();//子部门
//		emp.setParentId(id);
//		List<Employee> cList = this.empMapper.findChildEmpList(emp);
//		if(CollectionUtils.isEmpty(cList)) return childList;
//		for(Employee e : cList){
//			childList.add(e);
//		}
//		//把子部门循环一遍
//		for(Employee e : cList){
//			childList.addAll(setEmpList(e.getId(),emp));
//		}
		return childList;
	}

	@Override
	public int delete(List<String> id) {
		// TODO Auto-generated method stub
		return this.menuMapper.delete(id);
	}
	
	public List<Integer> getResMenuList (Integer resId){
		List<ResMenu> rmList = null;
		List<Integer> rmMenuIds = new ArrayList<Integer>();
		if(resId != null){
			rmList = resMenuMapper.findByResId(resId);
		}
		if(!CollectionUtils.isEmpty(rmList)){
			for(ResMenu rm : rmList){
				rmMenuIds.add(rm.getMenuId());
			}
		}
		return rmMenuIds;
	}
	
	public void setResMenuChecked(List<Integer> rmMenuIds,Menu m){
		if(CollectionUtils.isEmpty(rmMenuIds))
			return;
		if(rmMenuIds.contains(m.getId())){
			m.setChecked(true);
		}else{
			m.setChecked(false);
		}
	}
}
