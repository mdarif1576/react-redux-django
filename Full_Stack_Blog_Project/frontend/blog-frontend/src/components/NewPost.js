import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";

function NewPost(props) {
  const { open, handleClose, authSuccess, handleCloseNewPost } = props;
  const [blogHeading, setBlogHeading] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const handlePost = (e) => {
    e.preventDefault();

    if (authSuccess) {
        const { user_id } = jwt_decode(authSuccess);
       
      const config = {
        headers: {
          Authorization: `Bearer ${authSuccess}`,
        },
      };

      const data = {
        blog_content: blogContent,
        blog_heading: blogHeading,
        user_id: user_id,
      };

      

      axios
        .post(`http://127.0.0.1:8000/user_blog_api/`, data, config)
        .then(
          (res) => {
              // console.log(res.data)
            window.location.reload();
          },
          (error) => {
            // console.log(error);
            window.location.reload();
            // props.history.push("/login");
          }
        );
    }
    
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleCloseNewPost()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">NEW POST</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create your new post and click on Submit. Not at the moment? click
            on Cancel.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Blog Heading"
            type="text"
            value={blogHeading}
            fullWidth
            onChange={(evt) => {
              setBlogHeading(evt.target.value);
            }}
          />

          <Box m={4} />
          <TextareaAutosize
            rowsMin={8}
            rowsMax={10}
            style={{ width: "100%" }}
            variant="outlined"
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            value={blogContent}
            onChange={(evt) => {
              setBlogContent(evt.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseNewPost()} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authSuccess: state.authentication.tokenId,
});

export default connect(mapStateToProps)(NewPost);
