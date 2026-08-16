import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  userName: string;
  userEmail: string;
  resetUrl: string;
  requestTime: string;
}

export function ResetPasswordEmail({
  userName,
  userEmail,
  resetUrl,
  requestTime,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />

      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.logo}>NoteBase</Text>
          </Section>

          {/* Content */}
          <Section style={styles.content}>
            <Heading style={styles.heading}>Reset your password</Heading>

            <Text style={styles.text}>Hi {userName},</Text>

            <Text style={styles.text}>
              We received a request to reset the password for your NoteBase
              account
              {userEmail ? ` (${userEmail})` : ""} at {requestTime}.
            </Text>

            <Text style={styles.text}>
              Click the button below to choose a new password.
            </Text>

            {/* Reset button */}
            <Section style={styles.buttonContainer}>
              <Button href={resetUrl} style={styles.button}>
                Reset Password
              </Button>
            </Section>

            <Text style={styles.smallText}>
              This password reset link will expire soon. If you didn&apos;t
              request a password reset, you can safely ignore this email. Your
              password will not be changed.
            </Text>

            <Hr style={styles.hr} />

            <Text style={styles.smallText}>
              If the button above doesn&apos;t work, copy and paste the
              following URL into your browser:
            </Text>

            <Link href={resetUrl} style={styles.link}>
              {resetUrl}
            </Link>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} NoteBase. All rights reserved.
            </Text>

            <Text style={styles.footerText}>
              You received this email because a password reset was requested for
              your account.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f4f4f5",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: "40px 20px",
  },

  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    margin: "0 auto",
    maxWidth: "520px",
    overflow: "hidden" as const,
  },

  header: {
    padding: "28px 40px 10px",
  },

  logo: {
    color: "#18181b",
    fontSize: "24px",
    fontWeight: "700",
    margin: 0,
  },

  content: {
    padding: "20px 40px 40px",
  },

  heading: {
    color: "#18181b",
    fontSize: "26px",
    fontWeight: "700",
    lineHeight: "1.3",
    margin: "0 0 24px",
  },

  text: {
    color: "#3f3f46",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 16px",
  },

  buttonContainer: {
    padding: "12px 0 20px",
    textAlign: "center" as const,
  },

  button: {
    backgroundColor: "#E1002D",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: "600",
    padding: "13px 22px",
    textDecoration: "none",
  },

  smallText: {
    color: "#71717a",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "0 0 12px",
  },

  hr: {
    borderColor: "#e4e4e7",
    margin: "24px 0",
  },

  link: {
    color: "#2563eb",
    fontSize: "13px",
    lineHeight: "1.5",
    wordBreak: "break-all" as const,
  },

  footer: {
    backgroundColor: "#fafafa",
    padding: "24px 40px",
    textAlign: "center" as const,
  },

  footerText: {
    color: "#a1a1aa",
    fontSize: "11px",
    lineHeight: "1.5",
    margin: "4px 0",
  },
};
