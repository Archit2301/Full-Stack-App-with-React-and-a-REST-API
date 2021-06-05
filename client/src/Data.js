import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null ) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // GET request to API to request email and password
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }

  // POST request to create a new user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      })
    } else if (response.status === 500) {
      this.props.history.push('/error')
    } else {
      throw new Error();
    }
  }

  // POST request to create a new course 
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      })
    } else if (response.status === 500) {
      this.props.history.push('/error')
    } else {
      throw new Error();
    }
  }

  // PUT request to update a course
  async updateCourse(emailAddress, password, course, id) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      })
    } else if (response.status === 500) {
      this.props.history.push('/error')
    } else {
      throw new Error();
    }
  }

  // DELETE request to delete a course
  async deleteCourse(emailAddress, password, id) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      })
    } else if (response.status === 500) {
      this.props.history.push('/error')
    } else {
      throw new Error();
    }
  }
}