import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui';

const Skills = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <h1>Skills</h1>
      <Tabs
        defaultValue="account"
        className="w-[400px] justify-center items-center"
      >
        <TabsList>
          <TabsTrigger value="account">
            Frontend
          </TabsTrigger>
          <TabsTrigger value="password">
            Backend
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">
          Change your password here.
        </TabsContent>
      </Tabs>
    </section>
  );
};

export { Skills };
