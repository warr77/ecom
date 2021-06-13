const category=require("../model/category");
const {requireSignin,isAdmin,isAuth} =require("./routecontroller");
exports.create=(req,res)=>{

	const cate=new category(req.body);
	cate.save((err,data)=>{
		if(err){
			return res.status(40).json({
				error:err
			});
		}
		res.json({data});
	});
};

exports.categoryById = (req, res, next, id) => {
    category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category does not exist"
            });
        }
        req.category = category;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error:err
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error:err
            });
        }
        res.json({
            message: "Category deleted"
        });
    });
};

exports.list = (req, res) => {
    category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
};
