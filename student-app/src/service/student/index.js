export const getStudents = async (nickName) => {
  const token = localStorage.getItem("token");
  let params;
  if (nickName) {
    params.nick_name = nickName;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/students` + new URLSearchParams(params);

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const getDetailStudent = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const createStudent = async (request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("nick_name", request.nick_name);
  formData.append("university_id", request.university_id);
  formData.append("class_id", request.class_id);
  formData.append("profile_picture", request.profile_picture);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/students`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result;
};

export const updateStudent = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("nick_name", request.nick_name);
  formData.append("university_id", request.university_id);
  formData.append("class_id", request.class_id);
  if (request.profile_picture) {
    formData.append("profile_picture", request.profile_picture);
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/students/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
    }
  );

  const result = await response.json();
  return result;
};

export const deleteStudent = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  return result;
};
