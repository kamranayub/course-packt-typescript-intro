
/*
 * GET home page.
 */

export = {
  index: function(req, res) {
    res.render('index', { title: 'Todo App|Express + MongoDB' });
  }
}