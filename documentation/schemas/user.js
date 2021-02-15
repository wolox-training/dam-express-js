module.exports = {
  userId: {
    type: 'integer',
    example: 7
  },
  userFirstName: {
    type: 'string',
    example: 'tom99'
  },
  userEmail: {
    type: 'string',
    example: 'tom.engels@wolox.ar'
  },
  userLastName: {
    type: 'string',
    example: 'crus'
  },
  userPassword: {
    type: 'string',
    example: '12345678'
  },
  date: {
    type: 'string',
    example: '2021-02-15T20:51:32.749Z'
  },
  User: {
    type: 'object',
    properties: {
      first_name: {
        $ref: '#/components/schemas/userFirstName'
      },
      password: {
        $ref: '#/components/schemas/userPassword'
      },
      last_name: {
        $ref: '#/components/schemas/userLastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      }
    }
  },
  UserResponse: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/userId'
      },
      first_name: {
        $ref: '#/components/schemas/userFirstName'
      },
      last_name: {
        $ref: '#/components/schemas/userLastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      created_at: {
        $ref: '#/components/schemas/date'
      },
      updated_at: {
        $ref: '#/components/schemas/date'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
