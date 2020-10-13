const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      res.status(400).json({
        error: "category is not found ",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  // category.save((err, category) => {
  //   if (err) {
  //     res.status(400).json({
  //       error: "not able to create category",
  //     });
  //   }
  category
    .save()
    .then((cate) => {
      res.status(201).json(cate);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
//  Category.find()
//    .exec()
//    .then((docs) => {
//      res.status(200).json(docs);
//    })
//    .catch((err) => res.status(400).json(err));
   Category.find().exec((err, categories) => {
     if (err) {
       return res.status(400).json({
         error: "not able to get all category",
       });
     }

     res.json(categories);
   });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete category",
      });
    }
    res.json({
      message: "Successfull deleted",
    });
  });
};
exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "not able to update category",
      });
    }
    res.json(updatedCategory);
  });
};


