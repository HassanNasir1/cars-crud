import mock from './mock'

import './auth/jwt'
import './apps/countriesList'

mock.onAny().passThrough()
