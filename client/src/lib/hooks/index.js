import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  message,
} from 'antd';

import getHooks from "../../../../lib/hooks";

export const { useFetchDataIds } = getHooks({
  useState,
  useEffect,
  useCallback,
  message,
});
