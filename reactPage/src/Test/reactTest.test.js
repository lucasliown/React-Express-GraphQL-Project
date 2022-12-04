import { render, fireEvent, waitFor, screen, act } from "./test-utils";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import Signincomponent from "../pages/Signincomponent";
import Signupcomponent from "../pages/Signupcomponent";
import Profilecomponent from "../pages/Profilecomponent";
import Postingcomponent from "../pages/Postingcomponent";
import Singlepost from "../fragments/Singlepost";
import * as personalData from "../handlerdata/personaldata";
import * as postingData from "../handlerdata/postingdata";

//mock api server
const server = setupServer(
  rest.get("http://localhost:4000/api/users/login", async (req, res, ctx) => {
    return res(ctx.json(null));
  }),
  rest.get("http://localhost:4000/api/users/create", async (req, res, ctx) => {
    return res(
      ctx.json({
        email: "1111@126.com",
        join_Date: "Thu 28 Jul 2022",
        password_hash:
          "$argon2id$v=19$m=4096,t=3,p=1$TGLArn7J6ONRdCggwfAxGQ$iudBum450ltEg+tqcP0V4RVAL7T6KEy3huwmF+7Fre0",
        user_id: "34fc5338-7226-48cd-8d48-1ded7f5fd6b3",
        username: "lingjie",
        blockStatus: "false",
      })
    );
  }),
  rest.get("http://localhost:4000/api/users/", async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          email: "1111@126.com",
          join_Date: "Thu 28 Jul 2022",
          password_hash:
            "$argon2id$v=19$m=4096,t=3,p=1$TGLArn7J6ONRdCggwfAxGQ$iudBum450ltEg+tqcP0V4RVAL7T6KEy3huwmF+7Fre0",
          user_id: "34fc5338-7226-48cd-8d48-1ded7f5fd6b3",
          username: "lingjie",
        },
        {
          email: "2222@126.com",
          join_Date: "Thu 28 Jul 2022",
          password_hash:
            "$argon2id$v=19$m=4096,t=3,p=1$TGLArn7J6ONRdCggwfAxGQ$iudBum450ltEg+tqcP0V4RVAL7T6KEy3huwmF+7Fre0",
          user_id: "34fc5338-7226-48cd-8d48-1ded7f5fd6b3",
          username: "lingjie222",
        },
      ])
    );
  }),
  rest.get(
    "http://localhost:4000/api/post/getAllPost/1",
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            ImageURL: "",
            post_id: "21fff2fd-0a81-42b3-8818-3b0b57f8b1770",
            post_time: "2022-10-03T11:17:28.861Z",
            text: "<p>Here is My Post Message in posting page</p>",
            user: {
              email: "1111@126.com",
              join_Date: "Thu 28 Jul 2022",
              password_hash:
                "$argon2id$v=19$m=4096,t=3,p=1$TGLArn7J6ONRdCggwfAxGQ$iudBum450ltEg+tqcP0V4RVAL7T6KEy3huwmF+7Fre0",
              user_id: "1",
              username: "kaige",
            },
            user_id: "1",
          },
        ])
      );
    }
  ),
  rest.get(
    "http://localhost:4000/api/post/getAllPost/1",
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            ImageURL: "",
            post_id: "21fff2fd-0a81-42b3-8818-3b0b57f8b1770",
            post_time: "2022-10-03T11:17:28.861Z",
            text: "<p>Here is My Post Message in posting page</p>",
            user: {
              email: "1111@126.com",
              join_Date: "Thu 28 Jul 2022",
              password_hash:
                "$argon2id$v=19$m=4096,t=3,p=1$TGLArn7J6ONRdCggwfAxGQ$iudBum450ltEg+tqcP0V4RVAL7T6KEy3huwmF+7Fre0",
              user_id: "1",
              username: "kaige",
            },
            user_id: "1",
          },
        ])
      );
    }
  ),
  rest.get(
    "http://localhost:4000/api/reaction/getReactionForAPost",
    async (req, res, ctx) => {
      return res(
        ctx.json({
          like: 2,
          dislike: 1,
        })
      );
    }
  ),
  rest.get(
    "http://localhost:4000/api/reaction/preferenceStatus",
    async (req, res, ctx) => {
      return res(
        ctx.json({
          reaction_id: "d5817da5-1250-4f46-8a84-5064f9f1a72d",
          preference: false,
          user_id: "1",
          post_id: "21fff2fd-0a81-42b3-8818-3b0b57f8b1770",
        })
      );
    }
  ),
  rest.get(
    "http://localhost:4000/api/comment/getAllComment",
    async (req, res, ctx) => {
      return res(ctx.json([]));
    }
  )
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => {
  jest.restoreAllMocks();
  server.resetHandlers();
});
// clean up once the tests are done
afterAll(() => {
  server.close();
});

//test if user doesn't enter anything in sign in page
test("enter empty value for sign in", async () => {
  render(<Signincomponent />);
  const inputEmail = document.getElementById("inputEmail3");
  const inputPassword = document.getElementById("inputPassword3");
  const inputAuthCode = document.getElementById("inputPassword4");
  const button = document.getElementById("signIn");

  // Simulate input.
  fireEvent.change(inputEmail, { target: { value: "" } });
  fireEvent.change(inputPassword, { target: { value: "" } });
  fireEvent.change(inputAuthCode, { target: { value: "" } });
  fireEvent.click(button);

  await waitFor(() =>
    expect(
      screen.getByText("Email or password or auth code is not correctly")
    ).toBeInTheDocument()
  );
});

//when user enter user that not right
test("enter user is not exist for sign in", async () => {
  render(<Signincomponent />);
  jest.spyOn(personalData, "getCodeFromLocal").mockImplementation(1);
  const inputEmail = document.getElementById("inputEmail3");
  const inputPassword = document.getElementById("inputPassword3");
  const inputAuthCode = document.getElementById("inputPassword4");
  const button = document.getElementById("signIn");
  const sendButton = screen.getByTestId("sendAuthCode");
  fireEvent.click(sendButton);

  // Simulate input.

  fireEvent.change(inputEmail, { target: { value: "1111@126.com" } });
  fireEvent.change(inputPassword, {
    target: {
      value: "10",
    },
  });
  fireEvent.change(inputAuthCode, { target: { value: "2" } });
  fireEvent.click(button);

  await waitFor(() =>
    expect(
      screen.getByText("Email or password or auth code is not correctly")
    ).toBeInTheDocument()
  );
});

//test if user doesn't enter anything in sign up page
test("enter empty value for sign up", async () => {
  render(<Signupcomponent />);
  const inputUserName = document.getElementById("inputEmail4");
  const inputEmail = document.getElementById("inputPassword3");
  const inputPassword = document.getElementById("inputPassword4");
  const button = document.getElementById("signUp");

  // Simulate input.
  fireEvent.change(inputEmail, { target: { value: "" } });
  fireEvent.change(inputPassword, { target: { value: "" } });
  fireEvent.change(inputUserName, { target: { value: "" } });
  fireEvent.click(button);

  await waitFor(() =>
    expect(
      screen.getByText("Can not have empty username or email")
    ).toBeInTheDocument()
  );
});

//test if user  enter user that exist in database in sign up page
test("enter exist user for sign up", async () => {
  render(<Signupcomponent />);
  const inputUserName = document.getElementById("inputEmail4");
  const inputEmail = document.getElementById("inputPassword3");
  const inputPassword = document.getElementById("inputPassword4");
  const button = document.getElementById("signUp");

  // Simulate input.
  fireEvent.change(inputEmail, { target: { value: "1111@126.com" } });
  fireEvent.change(inputPassword, {
    target: {
      value:
        "$argon2id$v=19$m=4096,t=3,p=1$TGLArn7J6ONRdCggwfAxGQ$iudBum450ltEg+tqcP0V4RVAL7T6KEy3huwmF+7Fre0",
    },
  });
  fireEvent.change(inputUserName, { target: { value: "lingjie" } });
  fireEvent.click(button);

  await waitFor(() =>
    expect(
      screen.getByText("Username or email already exist")
    ).toBeInTheDocument()
  );
});

//test user detail can show in the My profile page
test("user detail showing in the My profile page", async () => {
  render(<Profilecomponent />);
  await waitFor(() => {
    expect(screen.getByText("kaige")).toBeInTheDocument();
    expect(screen.getByText("Thu 28 Jul 2022")).toBeInTheDocument();
    expect(screen.getByText("1111@126.com")).toBeInTheDocument();
  });
});

//check text of My post display in the posting page or not
test("text of My post display in the posting page", async () => {
  jest.spyOn(personalData, "getUserData").mockImplementation(() => {
    return { user_id: 1 };
  });
  const spyOnComment = jest
    .spyOn(postingData, "getDisplayCommentForAPost")
    .mockResolvedValue(() => {
      return [];
    });
  await spyOnComment();
  render(<Postingcomponent />);
  await waitFor(() => {
    expect(
      screen.getByText("Here is My Post Message in posting page")
    ).toBeInTheDocument();
  });
});

//when uplaod post, but user enter nothing
test("when uplaod post, but user enter nothing", async () => {
  jest.spyOn(personalData, "getUserData").mockImplementation(() => {
    return { user_id: 1 };
  });
  jest.spyOn(postingData, "getDisplayCommentForAPost").mockResolvedValue([]);
  render(<Postingcomponent />);
  const postButton = document.getElementById("postTest");
  fireEvent.click(postButton);

  await waitFor(() => {
    expect(
      screen.getByText(
        "Cannot have empty post message, Please enter your message!"
      )
    ).toBeInTheDocument();
  });
});

//click like button, Then the count of like increased 1
test("click like button, Then the count of like increased 1", async () => {
  let likeButton = null;
  jest.spyOn(personalData, "getUserData").mockImplementation(() => {
    return { user_id: 1 };
  });
  jest.spyOn(postingData, "addPreference").mockResolvedValue(null);
  jest.spyOn(postingData, "getDisplayCommentForAPost").mockResolvedValue([]);
  const post = {
    ImageURL: "",
    post_id: "21fff2fd-0a81-42b3-8818-3b0b57f8b1770",
    post_time: "2022-10-03T11:17:28.861Z",
    text: "<p>Here is My Post Message in posting page</p>",
    user: {
      email: "1111@126.com",
      join_Date: "Thu 28 Jul 2022",
      password_hash:
        "$argon2id$v=19$m=4096,t=3,p=1$TGLArn7J6ONRdCggwfAxGQ$iudBum450ltEg+tqcP0V4RVAL7T6KEy3huwmF+7Fre0",
      user_id: "1",
      username: "kaige",
    },
    user_id: "1",
  };
  render(<Singlepost detail={post} />);

  await waitFor(() => {
    likeButton = screen.getByTestId("likeOn");
    fireEvent.click(likeButton);
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
