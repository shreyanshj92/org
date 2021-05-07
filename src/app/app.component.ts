import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'XYZ org';
  depName = "";
  empName ="";
  empType = "";
  empDepartment = "";
  empReportingManager = "";
  showDepartmentList: boolean;
  showErrorEmpName: boolean;
  showErrorEmpType: boolean;
  showErrorEmpDepart: boolean;
  showErrorEmpManager: boolean;
  
  employeeTypes = [
    {
      key: 1,
      value: "Manager"
    },
    {
      key: 2,
      value: "Worker"
    }
  ];
  departments = [];
  reportingManagers = [];
  employeesByManager= [];
  employeesByDepartment=[];

  employees = [];

  ngOnInit(): void {
  }

  addDepartment(): void {
    this.departments.push(this.depName);
  }

  addEmployeeDetail(): void {
    this.showErrorEmpName = this.empName ? false : true;
    this.showErrorEmpType = this.empType ? false : true;
    this.showErrorEmpDepart = this.empDepartment ? false : true;
    this.showErrorEmpManager = this.empReportingManager ? false : true;
    if(this.employees.length){
      this.reportingManagers.push(this.empName);
    } else if (!this.employees.filter(emp => this.empReportingManager === emp.manager)[0]){
       
        this.reportingManagers.push(this.empReportingManager);
      
    }
    
    const employeeObj = {
      id : this.employees.length,
      name : this.empName,
      type : this.empType,
      department : this.empDepartment,
      manager : this.employees.length ? this.empReportingManager : this.empName
    }
    if(!this.showErrorEmpName && !this.showErrorEmpType && !this.showErrorEmpDepart && !this.showErrorEmpManager ) {
      this.employees.push(employeeObj);
    }    
    console.log(this.employees)
  }

  printEmployeeList(type): any {
    if (type === "manager") {
      this.reportingManagers.forEach(manager => {
       this.employeesByManager.push(this.employees.filter(emp => {
          return manager.value === emp.manager;
        }));
      }); 
    } else {
      this.departments.forEach(depart => {
       this.employeesByDepartment.push(this.employees.filter(emp => {
          return depart === emp.department;
        }))
      });
    }
  }

  printDepartmentList(): void {
    this.showDepartmentList = true;
  }

  printOrgChart(): void {

  }
}
