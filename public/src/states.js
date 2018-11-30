(function() {
  angular
    .module("Amerzon")
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise(function($injector) {
        $injector.invoke([
          "$state",
          function($state) {
            $state.go("app.customer");
          }
        ]);
      });

      $stateProvider
        .state("app", {
          url: "",
          abstract: true,
          templateUrl: "../templates/parent.html",
          cache: false
        })
        .state("app.customer", {
          url: "/customer",
          templateUrl: "../templates/customer.html",
          controller: "CustomerController as customer",
          resolve: {
            products: function(Products, SweetAlert) {
              return Products.list().then(
                function(response) {
                  return response.data;
                },
                function(err) {
                  console.error(err);
                  SweetAlert.swal(
                    {
                      title: "Something went wrong...",
                      text:
                        err.data && err.data.message
                          ? "Message: " + err.data.message
                          : "Sorry about that!",
                      confirmButtonColor: "#00A99D",
                      confirmButtonText: "OK",
                      type: "warning"
                    },
                    function(isConfirm) {}
                  );
                }
              );
            }
          }
        })
        .state("app.admin", {
          url:
            "/admin?firstName&lastName&password&bday&gender&email&emailInviteId&fbInviteId",
          templateUrl: "../templates/admin.html",
          controller: "AdminController as admin",
          resolve: {
            products: function(Products, SweetAlert) {
              return Products.list().then(
                function(response) {
                  return response.data;
                },
                function(err) {
                  console.error(err);
                  SweetAlert.swal(
                    {
                      title: "Something went wrong...",
                      text:
                        err.data && err.data.message
                          ? "Message: " + err.data.message
                          : "Sorry about that!",
                      confirmButtonColor: "#00A99D",
                      confirmButtonText: "OK",
                      type: "warning"
                    },
                    function(isConfirm) {}
                  );
                }
              );
            }
          }
        });
    });
})();
