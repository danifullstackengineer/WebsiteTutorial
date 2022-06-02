import { bad_email, good_email, good_email_but_in_db, bad_password_no_minimum, bad_password_no_letter, bad_password_no_special_char, good_password, post_to_reg } from "./credential";

// Expect to throw error

test("post_to_reg with bad email but good password", async () => {
  await expect(
    async () => await post_to_reg(bad_email, good_password)
  ).rejects.toThrow();
});

test("post_to_Reg with good email but bad_password_no_minimum", async ()=> {
  await expect(
    async () => await post_to_reg(good_email, bad_password_no_minimum)
  ).rejects.toThrow();
});

test("post_to_reg with good email but bad_password_no_letter", async ()=> {
  await expect(
    async ()=> await post_to_reg(good_email, bad_password_no_letter)
  ).rejects.toThrow();
});

test("post_to_reg with good email but bad_password_no_special_char", async ()=> {
  await expect(
    async () => await post_to_reg(good_email, bad_password_no_special_char)
  ).rejects.toThrow();
});

test("post_to_reg with email already in db", async ()=> {
  await expect(
    async () => await post_to_reg(good_email_but_in_db, good_password)
  ).rejects.toThrow();
});

// Expect to pass

test("post_to_reg with good email and good password and no user in db", () => {
  expect(post_to_reg(good_email, good_password));
});
