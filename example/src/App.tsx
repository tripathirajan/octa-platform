
import { Stack, Box, Button, Dropdown, DropdownItem, Container, Grid, Inline, Spacer, Popover, Dialog } from '@octa/primitives'

import './App.css'

const StackItem = ({ children }: { children: React.ReactNode }) => {
  return <Box style={{
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  }}>{children}</Box>
}
const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
  const sectionId = title.toLowerCase().replace(/\s+/g, '-');

  return (<Stack gap={4} style={{ border: '1px dashed #ccc', padding: '8px 16px 16px 16px' }}>
    <Box id={sectionId} as="h2" style={{ borderBottom: '1px solid #ccc' }}>{title}</Box>
    {children}
  </Stack>)

}
function App() {


  return (<Stack gap={8} style={{ padding: '16px' }}>
    <h1>Octa Platform</h1>
    <Section title="Elements">
      <Box>
        <h3>Buttons</h3>
        <Button disabled={false}>
          Click Me
        </Button>
        <Button disabled={true}>
          I am disabled
        </Button>
      </Box>
      <Box>
        <h3>Dropdown</h3>
        <Dropdown trigger={<Button>Open Dropdown</Button>}>
          <DropdownItem onSelect={() => console.log('Item 1 selected')}>
            Item 1
          </DropdownItem>
          <DropdownItem onSelect={() => console.log('Item 2 selected')}>
            Item 2
          </DropdownItem>
        </Dropdown>
      </Box>
    </Section>
    <Section title="Feedback">
      <Box>
        <h3>Popover</h3>
        <Popover trigger={<Box><Button>Open Popover</Button></Box>} defaultOpen={false}>
          <Box style={{ padding: '16px', backgroundColor: '#1c1b1bff', color: '#fff', borderRadius: '8px' }}>
            This is a Popover content. with custom style
          </Box>
        </Popover>
      </Box>
      <Box>
        <h3>Dialog</h3>
        <Dialog trigger={<Button>Open Dialog</Button>} defaultOpen={false} title="Dialog Title" description="This is the content of the dialog.">
          <Box style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '400px' }}>

            <Button onClick={() => console.log('Dialog action')}>Take Action</Button>
          </Box>
        </Dialog>
      </Box>

    </Section>
    <Section title="Layouts">
      <Box>
        <h3>Box</h3>
        <Box style={{ padding: '16px', backgroundColor: '#f0f0f0' }}>
          This is a Box component with padding and background color.
        </Box>
      </Box>
      <Box>
        <h3>Stack</h3>
        <Stack gap={4} style={{ border: '1px solid #ccc', padding: '16px' }}>
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
        <br />
        <Stack gap={4} style={{ border: '1px solid #ccc', padding: '16px', flexDirection: 'row' }}>
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </Box>
      <Box>
        <h3>Container</h3>
        <Container style={{ border: '1px solid #ccc', padding: '16px' }}>
          <Box as="span">Hello container</Box>
        </Container>
      </Box>
      <Box>
        <h3>Grid</h3>
        <Grid columns={'2fr 2fr 1fr'} gap={4} style={{ border: '1px solid #ccc', padding: '16px' }}>
          <Box style={{ backgroundColor: '#e0e0e0', padding: '8px' }}>Grid Item 1</Box>
          <Box style={{ backgroundColor: '#e0e0e0', padding: '8px' }}>Grid Item 2</Box>
          <Box style={{ backgroundColor: '#e0e0e0', padding: '8px' }}>Grid Item 3</Box>
          <Box style={{ backgroundColor: '#e0e0e0', padding: '8px' }}>Grid Item 4</Box>
        </Grid>
      </Box>
      <Box>
        <h3>Inline</h3>
        <Inline gap={4} style={{ border: '1px solid #ccc', padding: '16px' }}>
          <StackItem>Inline Item 1</StackItem>
          <StackItem>Inline Item 2</StackItem>
          <StackItem>Inline Item 3</StackItem>
        </Inline>
      </Box>
      <Box>
        <h3>Spacer</h3>
        <Box style={{ display: 'flex', border: '1px solid #ccc', padding: '16px' }}>
          <StackItem> Item 1</StackItem>
          <StackItem> Item 2</StackItem>
          <StackItem> Spacer Left Item</StackItem>
          <Spacer />
          <StackItem>Spacer Right Item</StackItem>
        </Box>
      </Box>

    </Section>

  </Stack>
  )
}

export default App
