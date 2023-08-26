const post = require("../model/PostJob");
const user = require("../model/userModel");
const authController = {
  async CreateJob(req, res) {
    try {
      const { jobTitle, salary, location, jobtype, experience } = req.body;
      if (!jobTitle || !salary || !location || !jobtype || !experience) {
        return res.status(400).json({ message: "all fields required" });
      }
      const id = req.params.id;
      const checkPost = await post.findOne({
        jobTitle,
        salary,
        location,
        jobtype,
        experience,
      });

      if (checkPost) {
        return res.status(500).json({ message: "Post Already exist" });
      }

      const checkId = await user.findById(id);

      if (!checkId) {
       
        return res.status(400).json({ message: "User Not exist"  });
      }
      
      const newUser = new post({
        jobTitle,
        salary,
        location,
        jobtype,
        experience,
        userId: id,
      });

      await newUser.save();

      // const token = jwt.sign(req.body)
      res.json({ newUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },
  async deleteJob(req, res) {
    try {
      const id = req.params.id;
      const user = await post
        .findByIdAndDelete(id)
        .then(() => {
          return res.status(200).send("Post Successfully Deleted");
        })
        .catch((error) => {
          return res.status(401).send("Post Deletion Failed");
        });
    } catch (err) {
      return res.send("Error in Delete Job : " + err);
    }
  },
  async JobList(req, res) {
    try {
      const list = await post.find();
      if (!list) {
        return res.status(401).send("Empty list");
      }

      return res.status(200).json(list);
    } catch (err) {
      return res.send("Error in Job List :" + err);
    }
  },
  async userPost(req,res){
    try{
      const userId = req.params.id;
      console.log(userId);
      if(!userId)
      {
        return res.status(500).json({message:"No data found"});
      }
const userPosts = await post.find({userId} );
return res.status(200).json(userPosts);


    }
    catch (err) {
      return res.send("Error in user Post List :" + err);
    }
  },

};
module.exports = authController;
