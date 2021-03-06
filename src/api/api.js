import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

// non class based Modules

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

const request = async (endpoint, data = {}, method = "get") => {
  console.debug("API Call:", endpoint, data, method);

  const url = `${BASE_URL}/${endpoint}`;
  const headers = { Authorization: `Bearer ${token}` };
  const params = method === "get" ? data : {};

  try {
    return (await axios({ url, method, data, params, headers })).data;
  } catch (err) {
    console.error("API Error:", err.response);
    let message = err.response.data.error.message;
    throw Array.isArray(message) ? message : [message];
  }
};

// Individual API routes

/** Get details on a company by handle. */

const getCompany = async (handle) => {
  let res = await request(`companies/${handle}`);
  return res.company;
};

const getCompanies = async (name) => {
  let res = await request("companies", { name });
  return res.companies;
};

// jobs api

const getJobs = async (title) => {
  let res = await request(`jobs`, { title });
  return res.jobs;
};

const getJob = async (id) => {
  let res = await request(`jobs/${id}`);
  return res;
};

// login

const loginUser = async (username, password) => {
  const res = await request(`auth/token`, { username, password }, "post");
  console.log(res);
  return res.token;
};

const getCurrentUser = async (username) => {
  const res = await request(`users/${username}`);
  console.log("getcursuer", res.user);
  return res.user;
};

// signup

const signUpUser = async (formData) => {
  const res = await request(`auth/register`, formData, "post");
  return res.token;
};

//user profile

const updateProfile = async (username, data) => {
  const res = await request(`users/${username}`, data, "patch");
  return res.user;
};

const applyToJob = async (username, jobId) =>{
  const res = await request(`users/${username}/jobs/${jobId}`,{},'post')
  return res.applied
}

export {
  request,
  getCompany,
  getCompanies,
  getJobs,
  getJob,
  loginUser,
  getCurrentUser,
  signUpUser,
  updateProfile,
  applyToJob
};
