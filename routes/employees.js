const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const util = require('../common/util');



router.get('/:currentPage/:pageSize/:sortField/:sortDir/:filterText*?', 
  function (req, res, next) {
    // debugger
    let response = {
      employees: util.getEmployeesData(req.params),
      pageCount: util.pageCount,
      recordCount: util.recordCount
    }
    res.send({ response: response});
  }
);

module.exports = router;


