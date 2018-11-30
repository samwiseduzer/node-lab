angular.module("Amerzon").factory("Products", products);

function products($http) {
  const baseUrl = "/products";
  return {
    list: list,
    create: create,
    remove: remove,
    update: update
  };

  function list() {
    return $http.get(baseUrl);
  }

  function create(payload) {
    return $http.post(baseUrl, payload);
  }

  function remove(id) {
    return $http.delete(baseUrl + "/" + id);
  }

  function update(id) {
    return $http.put(baseUrl + "/" + id);
  }
}
