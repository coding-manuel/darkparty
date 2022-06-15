import React from 'react'
import { Paper, Stack, Tabs, TextInput, Text } from '@mantine/core';

export default function Auth() {
  return (
    <Tabs position='center' variant="pills">
      <Tabs.Tab label="Sign In">
          <Stack>
            <TextInput
                label="EMAIL OR USERNAME"
                required
            />
          </Stack>
      </Tabs.Tab>
      <Tabs.Tab label="Sign Up">Second tab content</Tabs.Tab>
    </Tabs>
  )
}
