const faker = require('faker/locale/en_IND');

const config = {
    total: 100,
    sortField: 'id',
    sortDir: 1,
    filterCols: ["id", "firstName", "lastName"]
}

const util = {
    employees: (function (config) {
        // console.log('Total: ' + total)
        const emps = [];
        for (let index = 0; index < config.total; index++) {
            let emp = {
                id: (index + 1),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                phone: faker.phone.phoneNumber(),
                avatar: faker.internet.avatar(),
                userName: faker.internet.userName(),
                jobTitle: faker.name.jobTitle(),
                company: faker.company.companyName()
            }
            emp.email = (function (firstName, lastName) {
                return faker.internet.email(firstName, lastName);
            }(emp.firstName, emp.lastName));
            emps.push(emp);
        }
        return emps;
    }(config)),
    pageCount: 1,
    recordCount: 0,
    getEmployeesData(params) {
        let filterText = params.filterText ? params.filterText.trim() : "";
        let filteredEmployees = filterText ?
            this.filter(this.employees, params.filterText ? params.filterText.trim() : "", config.filterCols) :
            this.employees;

        let filteredAndSortedEmployees = this.sort(filteredEmployees, params.sortField || config.sortField, params.sortDir || config.sortDir);
        let currentPage = Number.parseInt(params.currentPage);
        let pageSize = Number.parseInt(params.pageSize);
        this.pageCount = Math.ceil(filteredEmployees.length / pageSize);
        this.recordCount = filteredEmployees.length;
        // console.log(currentPage, pageSize)
        // return filteredAndSortedEmployees;
        return filteredAndSortedEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    },
    filter(collection = [], text = "", filterCols = []) {
        return collection.filter(item => 
            filterCols.some(col => item[col].toString().toLowerCase().indexOf(text.toLowerCase()) > -1)
            // item.id.toString().toLowerCase().indexOf(text.toLowerCase()) > -1 ||
            // item.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
            // item.lastName.toLowerCase().indexOf(text.toLowerCase()) > -1
        
        );
    },
    sort(collection = [], field = config.sortField, direction = config.sortDir) {
        return collection.sort(function (a, b) {
            let x = a[field];
            let y = b[field];
            return (direction == 1) ?
                (x < y ? -1 : x > y ? 1 : 0) :
                (x < y ? 1 : x > y ? -1 : 0)
        });
    }
}

module.exports = util;