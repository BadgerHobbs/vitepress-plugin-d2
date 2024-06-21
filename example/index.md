# D2 Diagram Examples

This page demonstrates using the VitePress D2 diagram plugin to create and configure both simple and complex diagrams.

Some of the below examples are copied from the [official documentation](https://d2lang.com/tour/intro), which you checkout to see the full capabilities of D2 diagrams.

## Simple Diagram

```d2
x -> y: hello world
```

````
```
x -> y: hello world
```
````

## Custom Diagram Config

```d2
:::config
layout: DAGRE
theme: GRAPE_SODA
darkTheme: BUTTERED_TOAST
:::

x -> y: hello world
```

````
```d2
:::config
layout: DAGRE
theme: GRAPE_SODA
darkTheme: BUTTERED_TOAST
:::

x -> y: hello world
```
````

## Animated Diagram

```d2
direction: right
x -> y: hi {
  style.animated: true
}
```

````
```d2
direction: right
x -> y: hi {
  style.animated: true
}
```
````

## Sketch Style Diagram

```d2
:::config
sketch: true
:::

Write Replica Canada <-> Write Replica Australia

Read Replica <- Master

x -- y

super long shape id here -> super long shape id even longer here
```

````
```d2
:::config
sketch: true
:::

Write Replica Canada <-> Write Replica Australia

Read Replica <- Master

x -- y

super long shape id here -> super long shape id even longer here
```
````

## Sequence Diagram

```d2
shape: sequence_diagram
son -> father: Can I borrow your car?
friend -> father: Never lend your car to anyone to whom you have given birth.
father -> father: internal debate ensues

```

````
```d2
shape: sequence_diagram
son -> father: Can I borrow your car?
friend -> father: Never lend your car to anyone to whom you have given birth.
father -> father: internal debate ensues

```
````

## Composition Diagram

```d2
:::config
animateInterval: 1200
fileType: GIF
:::

direction: right

title: {
  label: Normal deployment
  near: bottom-center
  shape: text
  style.font-size: 40
  style.underline: true
}

local: {
  code: {
    icon: https://icons.terrastruct.com/dev/go.svg
  }
}
local.code -> github.dev: commit

github: {
  icon: https://icons.terrastruct.com/dev/github.svg
  dev
  master: {
    workflows
  }

  dev -> master.workflows: merge trigger
}

github.master.workflows -> aws.builders: upload and run

aws: {
  builders -> s3: upload binaries
  ec2 <- s3: pull binaries

  builders: {
    icon: https://icons.terrastruct.com/aws/Developer%20Tools/AWS-CodeBuild_light-bg.svg
  }
  s3: {
    icon: https://icons.terrastruct.com/aws/Storage/Amazon-S3-Glacier_light-bg.svg
  }
  ec2: {
    icon: https://icons.terrastruct.com/aws/_Group%20Icons/EC2-instance-container_light-bg.svg
  }
}

local.code -> aws.ec2: {
  style.opacity: 0.0
}

scenarios: {
  hotfix: {
    title.label: Hotfix deployment
    (local.code -> github.dev)[0].style: {
      stroke: "#ca052b"
      opacity: 0.1
    }

    github: {
      dev: {
        style.opacity: 0.1
      }
      master: {
        workflows: {
          style.opacity: 0.1
        }
        style.opacity: 0.1
      }

      (dev -> master.workflows)[0].style.opacity: 0.1
      style.opacity: 0.1
      style.fill: "#ca052b"
    }

    (github.master.workflows -> aws.builders)[0].style.opacity: 0.1

    local.code -> aws.ec2: {
      style.opacity: 1
      style.stroke-dash: 5
      style.stroke: "#167c3c"
    }
  }
}
```

````
```d2
:::config
animateInterval: 1200
fileType: GIF
:::

direction: right

title: {
  label: Normal deployment
  near: bottom-center
  shape: text
  style.font-size: 40
  style.underline: true
}

local: {
  code: {
    icon: https://icons.terrastruct.com/dev/go.svg
  }
}
local.code -> github.dev: commit

github: {
  icon: https://icons.terrastruct.com/dev/github.svg
  dev
  master: {
    workflows
  }

  dev -> master.workflows: merge trigger
}

github.master.workflows -> aws.builders: upload and run

aws: {
  builders -> s3: upload binaries
  ec2 <- s3: pull binaries

  builders: {
    icon: https://icons.terrastruct.com/aws/Developer%20Tools/AWS-CodeBuild_light-bg.svg
  }
  s3: {
    icon: https://icons.terrastruct.com/aws/Storage/Amazon-S3-Glacier_light-bg.svg
  }
  ec2: {
    icon: https://icons.terrastruct.com/aws/_Group%20Icons/EC2-instance-container_light-bg.svg
  }
}

local.code -> aws.ec2: {
  style.opacity: 0.0
}

scenarios: {
  hotfix: {
    title.label: Hotfix deployment
    (local.code -> github.dev)[0].style: {
      stroke: "#ca052b"
      opacity: 0.1
    }

    github: {
      dev: {
        style.opacity: 0.1
      }
      master: {
        workflows: {
          style.opacity: 0.1
        }
        style.opacity: 0.1
      }

      (dev -> master.workflows)[0].style.opacity: 0.1
      style.opacity: 0.1
      style.fill: "#ca052b"
    }

    (github.master.workflows -> aws.builders)[0].style.opacity: 0.1

    local.code -> aws.ec2: {
      style.opacity: 1
      style.stroke-dash: 5
      style.stroke: "#167c3c"
    }
  }
}
```
````

## Grid Diagram

```d2
direction: right

users -- via -- teleport

teleport -> jita: "all connections audited and logged"
teleport -> infra

teleport -> identity provider
teleport <- identity provider

users: "" {
  grid-columns: 1

  Engineers: {
    shape: circle
    icon: https://icons.terrastruct.com/essentials%2F365-user.svg
  }
  Machines: {
    shape: circle
    icon: https://icons.terrastruct.com/aws%2FCompute%2FCompute.svg
  }
}

via: "" {
  grid-columns: 1

  https: "HTTPS://"
  kubectl: "> kubectl"
  tsh: "> tsh"
  api: "> api"
  db clients: "DB Clients"
}

teleport: Teleport {
  grid-rows: 2

  inp: |md
    # Identity Native Proxy
  | {
    width: 300
  }

  Audit Log.icon: https://icons.terrastruct.com/tech%2Flaptop.svg
  Cert Authority.icon: https://icons.terrastruct.com/azure%2FWeb%20Service%20Color%2FApp%20Service%20Certificates.svg
}

jita: "Just-in-time Access via" {
  grid-rows: 1

  Slack.icon: https://icons.terrastruct.com/dev%2Fslack.svg
  Mattermost
  Jira
  Pagerduty
  Email.icon: https://icons.terrastruct.com/aws%2F_General%2FAWS-Email_light-bg.svg
}

infra: Infrastructure {
  grid-rows: 2

  ssh.icon: https://icons.terrastruct.com/essentials%2F112-server.svg
  Kubernetes.icon: https://icons.terrastruct.com/azure%2F_Companies%2FKubernetes.svg
  My SQL.icon: https://icons.terrastruct.com/dev%2Fmysql.svg
  MongoDB.icon: https://icons.terrastruct.com/dev%2Fmongodb.svg
  PSQL.icon: https://icons.terrastruct.com/dev%2Fpostgresql.svg
  Windows.icon: https://icons.terrastruct.com/dev%2Fwindows.svg
}

identity provider: Indentity Provider {
  icon: https://icons.terrastruct.com/azure%2FIdentity%20Service%20Color%2FIdentity%20governance.svg
}
```

````
```d2
direction: right

users -- via -- teleport

teleport -> jita: "all connections audited and logged"
teleport -> infra

teleport -> identity provider
teleport <- identity provider

users: "" {
  grid-columns: 1

  Engineers: {
    shape: circle
    icon: https://icons.terrastruct.com/essentials%2F365-user.svg
  }
  Machines: {
    shape: circle
    icon: https://icons.terrastruct.com/aws%2FCompute%2FCompute.svg
  }
}

via: "" {
  grid-columns: 1

  https: "HTTPS://"
  kubectl: "> kubectl"
  tsh: "> tsh"
  api: "> api"
  db clients: "DB Clients"
}

teleport: Teleport {
  grid-rows: 2

  inp: |md
    # Identity Native Proxy
  | {
    width: 300
  }

  Audit Log.icon: https://icons.terrastruct.com/tech%2Flaptop.svg
  Cert Authority.icon: https://icons.terrastruct.com/azure%2FWeb%20Service%20Color%2FApp%20Service%20Certificates.svg
}

jita: "Just-in-time Access via" {
  grid-rows: 1

  Slack.icon: https://icons.terrastruct.com/dev%2Fslack.svg
  Mattermost
  Jira
  Pagerduty
  Email.icon: https://icons.terrastruct.com/aws%2F_General%2FAWS-Email_light-bg.svg
}

infra: Infrastructure {
  grid-rows: 2

  ssh.icon: https://icons.terrastruct.com/essentials%2F112-server.svg
  Kubernetes.icon: https://icons.terrastruct.com/azure%2F_Companies%2FKubernetes.svg
  My SQL.icon: https://icons.terrastruct.com/dev%2Fmysql.svg
  MongoDB.icon: https://icons.terrastruct.com/dev%2Fmongodb.svg
  PSQL.icon: https://icons.terrastruct.com/dev%2Fpostgresql.svg
  Windows.icon: https://icons.terrastruct.com/dev%2Fwindows.svg
}

identity provider: Indentity Provider {
  icon: https://icons.terrastruct.com/azure%2FIdentity%20Service%20Color%2FIdentity%20governance.svg
}
```
````

## Interactive Tooltips

```d2
x: {tooltip: Total abstinence is easier than perfect moderation}
y: {tooltip: Gee, I feel kind of LIGHT in the head now,\nknowing I can't make my satellite dish PAYMENTS!}
x -> y
```

````
```d2
x: {tooltip: Total abstinence is easier than perfect moderation}
y: {tooltip: Gee, I feel kind of LIGHT in the head now,\nknowing I can't make my satellite dish PAYMENTS!}
x -> y
```
````

## Interactive Links

```d2
x: I'm a Mac {
  link: https://apple.com
}
y: And I'm a PC {
  link: https://microsoft.com
}
x -> y: gazoontite
```

````
```d2
x: I'm a Mac {
  link: https://apple.com
}
y: And I'm a PC {
  link: https://microsoft.com
}
x -> y: gazoontite
```
````
