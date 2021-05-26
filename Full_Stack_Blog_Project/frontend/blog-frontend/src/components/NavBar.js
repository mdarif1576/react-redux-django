import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PostAddIcon from "@material-ui/icons/PostAdd";
// import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NewPost from "./NewPost";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const { authSuccess, logout, addUser, userName } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openNewForm, setOpenNewForm] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewPost = () => {
    setOpenNewForm(!openNewForm);
  };

  const handleCloseNewPost = (ind) => {
    setOpenNewForm(!openNewForm);
  };

  useEffect(() => {
    if (authSuccess) {
      const { user_id } = jwt_decode(authSuccess);

      axios
        .get(`http://127.0.0.1:8000/user_blog_api/getuser/${user_id}/`, {
          headers: {
            Authorization: `Bearer ${authSuccess}`,
          },
        })
        .then(
          (res) => {
            const { username } = res.data;
            addUser([user_id, username]);
          },
          (error) => {
            window.location.reload();
            // props.history.push("/login");
          }
        );
    }
  }, [authSuccess]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            BLOG
            <PostAddIcon />
          </Typography>

          {authSuccess && (
            <>
              <Typography variant="h6" className={classes.title}>
                <Link href="/landing" color="inherit" variant="h6">
                  All Blog Posts
                </Link>
              </Typography>
              <Typography variant="h6" className={classes.title}>
                <Link href="userblog" color="inherit" variant="h6">
                  My Blog Posts
                </Link>
              </Typography>
              <Typography variant="h6" className={classes.title}>
                {/* <Link href="/landing" color="inherit" variant="h6">
                  Create New Post
                </Link> */}
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleNewPost}
                  color="inherit"
                >
                  <AddCircleIcon fontSize="large" />
                </IconButton>
              </Typography>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    {userName ? userName.toUpperCase() : null}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/login"
                      color="inherit"
                      variant="subtitle2"
                      onClick={() => {
                        logout();
                      }}
                    >
                      LOGOUT
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {openNewForm && <NewPost open={openNewForm} handleCloseNewPost={handleCloseNewPost}/>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authSuccess: state.authentication.tokenId,
  userId: state.userData.userId,
  userName: state.userData.userName,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch({ type: "LOG_OUT" }),
  addUser: (val) => dispatch({ type: "ADD_USER", payload: val }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
