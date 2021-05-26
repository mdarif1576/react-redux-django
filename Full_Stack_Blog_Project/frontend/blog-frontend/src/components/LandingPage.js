import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ModalForm from "./ModalForm";
import InputLabel from '@material-ui/core/InputLabel';

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function LandingPage(props) {
  const triggerText = "Open form";
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { authSuccess } = props;

  const [allBlogData, setAllBlogData] = useState([]);
  const [userId, setUserId] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault(event);
    // console.log(event.target.name.value);
    // console.log(event.target.email.value);
  };

  useEffect(() => {
    if (authSuccess === null) {
      props.history.push("/login");
    }

    if (authSuccess) {
      const authSuccess = localStorage.getItem("tokenId");
      const { user_id } = jwt_decode(authSuccess);
      setUserId(user_id);
      axios
        .get("http://127.0.0.1:8000/user_blog_api/", {
          headers: {
            Authorization: `Bearer ${authSuccess}`,
          },
        })
        .then(
          (res) => {
            const arr = res.data;

            const newArray = arr.map((item) => {
              return { ...item, modalFlag: false };
            });

            setAllBlogData(newArray);
          },
          (error) => {
            // console.log(error);
            props.history.push("/login");
          }
        );
    }
  }, [authSuccess]);

  const handleClose = (ind) => {
    
    const newArray = [
      ...allBlogData.slice(0, ind),
      { ...allBlogData[ind], modalFlag: !allBlogData[ind].modalFlag },
      ...allBlogData.slice(ind + 1),
    ];
    
    setAllBlogData(newArray);
  };

  const handleModalFlag = (ind) => {
   
    const newArray = [
      ...allBlogData.slice(0, ind),
      { ...allBlogData[ind], modalFlag: !allBlogData[ind].modalFlag },
      ...allBlogData.slice(ind + 1),
    ];
   
    setAllBlogData(newArray);
  };

  const handleDelete = (blogId) => {
    // console.log(blogId)
    // e.preventDefault();
   
    if (authSuccess) {
      const config = {
        headers: {
          Authorization: `Bearer ${authSuccess}`,
        },
      };

      // const data = {
      //   blog_content: blogContent,
      //   blog_heading: blogHeading,
      //   user_id: userId,
      //   id: blogId,
      // };

      axios
        .delete(`http://127.0.0.1:8000/user_blog_api/${blogId}/`, config)
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
  }

  return (
    <div>
      {allBlogData.map((item, index) => {
        return (
          <div key={index}>
            <Accordion
              square
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>{item.blog_heading}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.blog_content}</Typography>
              </AccordionDetails>
              <Typography>
              <InputLabel>&nbsp;&nbsp;&nbsp;Posted by - User ID: {item.user_id}</InputLabel>
              </Typography>

              {userId == item.user_id ? (
                <div className={classes.root}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleModalFlag(index);
                    }}
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    DELETE
                  </Button>
                  {item.modalFlag && (
                    <ModalForm
                      open={item.modalFlag}
                      handleClose={handleClose}
                      heading={item.blog_heading}
                      content={item.blog_content}
                      blogId={item.id}
                      userId={item.user_id}
                      ind={index}
                    />
                  )}
                </div>
              ) : null}
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authSuccess: state.authentication.tokenId,
});

export default connect(mapStateToProps)(LandingPage);
